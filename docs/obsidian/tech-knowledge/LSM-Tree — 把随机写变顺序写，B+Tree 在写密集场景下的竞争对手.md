---
title: LSM-Tree — 把随机写变顺序写，B+Tree 在写密集场景下的竞争对手
aliases:
  - LSM-Tree
  - Log-Structured Merge Tree
  - B Tree
  - B+Tree
  - LSM Tree vs B+Tree
  - 写密集场景下的数据库存储引擎王者
tags:
  - tech-knowledge
  - database
  - storage-engine
  - lsm-tree
  - b-tree
  - b-plus-tree
  - mysql
  - rocksdb
status: published
created: 2026-07-03
updated: 2026-07-03
---
# LSM-Tree — 把随机写变顺序写，B+Tree 在写密集场景下的竞争对手

> [!abstract]
> **LSM-Tree (Log-Structured Merge Tree)** 是写密集场景下非常重要的存储引擎思想。它的核心不是“树长什么样”，而是：把用户看到的一次写入，转换成内存追加 + 磁盘顺序写；再通过后台合并 (Compaction) 把数据整理成可查询的有序文件。它牺牲一部分读放大和空间放大，换取极强的写入吞吐。

## 1. 先建立直觉：数据库为什么怕随机写？

磁盘和 SSD 都更喜欢连续、批量、顺序的写入模式。

传统索引结构如 **B+Tree (B Plus Tree)** 在更新某个 key 时，通常要定位到对应叶子页，然后在原位置附近修改页内容：

```text
写入 key = 42
  ↓
从根节点一路查到叶子页
  ↓
修改叶子页
  ↓
可能分裂页、更新父节点、写日志、刷脏页
```

如果写入 key 分布很随机，就会导致大量不同页面被修改：

```text
随机 key 写入：
key 10   → page A
key 999  → page Z
key 318  → page M
key 57   → page B

结果：很多页都被弄脏，刷盘位置分散。
```

LSM-Tree 的反问是：

> 能不能不要每次都去磁盘随机找位置改？能不能先把写入像日志一样追加下来，之后再慢慢整理？

这就是 LSM 的精神内核：**写入路径优先顺序化，整理工作后台化。**

## 2. B Tree、B+Tree、LSM-Tree 分别是什么？

### 2.1 B Tree：为磁盘分页而生的平衡搜索树

**B Tree (Balanced Tree)** 是一种多路平衡搜索树。和二叉搜索树不同，一个节点可以存很多 key，并有多个子节点。

```text
二叉树：一个节点最多 2 个孩子

        50
       /  \
     20    80

B Tree：一个节点可以存多个 key，分出多个范围

        [20 | 50 | 80]
       /    |    |    \
    <20  20~50 50~80  >80
```

为什么数据库喜欢多路树？因为磁盘 / SSD 的读写单位通常是页 (Page / Block)，不是单个 key。一个节点设计成接近一个页大小，就能一次 I/O 带回很多 key，树的高度也会很低。

### 2.2 B+Tree：数据库索引更常用的 B Tree 变体

**B+Tree (B Plus Tree)** 是数据库里更常见的结构。它和 B Tree 的关键区别是：

- 内部节点主要保存索引 key，用来导航；
- 真实数据或记录指针集中在叶子节点；
- 叶子节点通常通过链表相连，方便范围扫描。

```text
B+Tree：

                 [30 | 60]
                /    |    \
          [10|20] [30|40|50] [60|70|80]
             │        │          │
             └────────┴──────────┘  叶子节点有序链表
```

这让 B+Tree 很适合：

- 点查：从根到叶子，$O(log_B n)$；
- 范围查：定位起点后沿叶子链表顺序扫；
- 读多写少或读写均衡的 OLTP 场景。

MySQL InnoDB 的主索引就是典型 B+Tree 思路。

### 2.3 LSM-Tree：不是传统树，而是分层有序文件体系

**LSM-Tree (Log-Structured Merge Tree)** 名字里有 Tree，但它不像 B+Tree 那样主要由可原地修改的页节点组成。它更像一个分层系统：

```text
写入入口
  ↓
WAL / Commit Log      保证崩溃恢复
  ↓
MemTable              内存中的有序结构
  ↓ flush
SSTable Level 0       磁盘不可变有序文件
  ↓ compaction
SSTable Level 1
  ↓ compaction
SSTable Level 2
  ↓
...
```

关键对象：

| 组件 | 作用 |
|---|---|
| WAL / Commit Log | 先追加日志，保证掉电后可恢复 |
| MemTable | 内存里的有序表，常用跳表 / 红黑树等结构 |
| Immutable MemTable | 达到阈值后冻结，等待 flush |
| SSTable | Sorted String Table，磁盘上的不可变有序文件 |
| Bloom Filter | 快速判断某个 key 是否可能在某个 SSTable 中 |
| Compaction | 后台合并多个 SSTable，清理旧版本和删除标记 |

## 3. LSM-Tree 的写入路径：先写日志，再写内存

一次写入通常是：

```text
put(key, value)
  ↓
1. 追加 WAL：顺序写日志，保证持久性
  ↓
2. 写入 MemTable：内存有序结构，速度快
  ↓
3. 返回成功
  ↓
4. MemTable 满了后转为 Immutable MemTable
  ↓
5. 后台 flush 成 SSTable
```

ASCII 流程图：

```text
客户端写入
   │
   ▼
┌──────────────┐
│ WAL 顺序追加  │  ← 崩溃恢复依赖它
└──────┬───────┘
       ▼
┌──────────────┐
│ MemTable 内存 │  ← 写入快，保持 key 有序
└──────┬───────┘
       │ 满了
       ▼
┌──────────────┐
│ Immutable    │
│ MemTable     │
└──────┬───────┘
       ▼ flush
┌──────────────┐
│ SSTable 文件  │  ← 磁盘顺序写，不再原地修改
└──────────────┘
```

这里的关键是：用户写入不直接去磁盘旧位置改数据，而是先顺序追加日志，并在内存里更新最新状态。

这就是“把随机写变顺序写”。

## 4. SSTable：LSM-Tree 的磁盘基本单位

**SSTable (Sorted String Table)** 是一个不可变、有序的 key-value 文件。

它通常包含：

```text
Data Blocks       存放有序 key-value
Index Block       记录 block 边界，帮助二分定位
Filter Block      Bloom Filter，判断 key 是否可能存在
Metadata/Footer   文件元信息
```

概念图：

```text
SSTable 文件
┌──────────────────────────┐
│ Data Block 1: a..f       │
├──────────────────────────┤
│ Data Block 2: g..m       │
├──────────────────────────┤
│ Data Block 3: n..z       │
├──────────────────────────┤
│ Index: a→block1, g→block2│
├──────────────────────────┤
│ Bloom Filter             │
├──────────────────────────┤
│ Footer / Metadata        │
└──────────────────────────┘
```

因为 SSTable 内部有序，所以它支持：

- 点查：先用索引定位 block；
- 范围查：顺序扫描多个 block；
- 合并：多个有序文件可以像归并排序一样线性合并。

不可变 (Immutable) 是 LSM 的关键设计：

> 旧文件不原地修改，新数据写成新文件，后台再归并整理。

## 5. 读路径：为什么 LSM 写快但读可能变复杂？

读取某个 key 时，LSM 需要从“最新层”一路找：

```text
get(key)
  ↓
1. 查 MemTable
  ↓ 未命中
2. 查 Immutable MemTable
  ↓ 未命中
3. 查 Level 0 的 SSTable
  ↓ 未命中
4. 查 Level 1、Level 2、...
```

因为同一个 key 可能存在多个版本：

```text
Level 0: key=42 -> v3   最新
Level 1: key=42 -> v2   旧版本
Level 3: key=42 -> v1   更旧
```

读取时必须优先返回最新版本。

这就是 LSM 的典型代价：**读放大 (Read Amplification)**。

为降低读放大，LSM 引擎会使用：

| 技术 | 作用 |
|---|---|
| Bloom Filter | 快速跳过一定不存在 key 的 SSTable |
| Block Cache | 缓存热数据块 |
| Index Cache | 缓存 SSTable 索引 |
| 分层 Compaction | 限制每层文件数量和重叠范围 |
| Prefix Bloom / Range Filter | 优化前缀和范围查询 |

## 6. Compaction：LSM-Tree 的后台整理机器

如果只追加不整理，SSTable 会越来越多，旧版本和删除标记会越来越多，读会越来越慢。

所以 LSM 必须做 **Compaction (合并压缩)**。

Compaction 做几件事：

1. 合并多个有序 SSTable；
2. 对同一个 key 只保留新版本；
3. 清理过期数据；
4. 处理删除标记 (Tombstone)；
5. 把数据推向更低层级，减少上层文件数量。

示意：

```text
Compaction 前：
L0: [a:1, c:1, d:1]
L0: [a:2, b:1, e:1]
L1: [a:0, b:0, f:0]

归并时按 key 排序，并保留最新版本：

Compaction 后：
L1: [a:2, b:1, c:1, d:1, e:1, f:0]
```

它像数据库里的“后台清洁工”：前台写入先快起来，后台慢慢把房间收拾整齐。

但 Compaction 也会带来代价：

- 会额外读旧文件；
- 会额外写新文件；
- 会占用 CPU、I/O、磁盘空间；
- 如果跟不上写入速度，就会引发写入停顿或延迟尖刺。

这就是 **写放大 (Write Amplification)**：用户写入 1 次，底层可能因为多轮 compaction 被重写多次。

## 7. 删除与更新：LSM 为什么需要 Tombstone？

因为 SSTable 不可变，删除不能直接去旧文件里抹掉 key。

LSM 的删除通常写入一个特殊标记：**墓碑 (Tombstone)**。

```text
delete(key=42)
  ↓
WAL 追加 delete 标记
  ↓
MemTable 写入 key=42, tombstone
  ↓
flush 成 SSTable
```

读取时，如果遇到最新版本是 tombstone，就认为 key 不存在。

真正的物理删除要等 compaction：

```text
旧值：       key=42 -> value
新墓碑：     key=42 -> TOMBSTONE
compaction：确认更低层旧值都被覆盖后，最终丢弃旧值和墓碑
```

这解释了为什么 LSM 系统里大量删除可能导致：

- 磁盘空间短期不降；
- 读路径还要处理 tombstone；
- compaction 压力变大。

## 8. B+Tree 的读写路径：原地维护有序结构

B+Tree 的写入更像“把数据放到它应该在的位置”：

```text
insert / update key
  ↓
从 root 查到 leaf
  ↓
修改叶子页
  ↓
如果页满：分裂页，更新父节点
  ↓
写 WAL / redo log，之后刷脏页
```

B+Tree 的优势在于结构始终相对整洁：

- 查一个 key，路径明确；
- 范围查询天然友好；
- 数据不会像 LSM 那样散在多个层级多个文件中；
- 不需要大规模后台 compaction 才能维持基本可读性。

但它的弱点是随机写更明显：

```text
随机插入 / 更新
  ↓
不同叶子页被频繁修改
  ↓
缓存命中差时，I/O 分散
  ↓
页分裂、锁竞争、脏页刷盘带来额外成本
```

## 9. LSM-Tree vs B+Tree：核心对比

| 维度 | LSM-Tree | B+Tree / B+Tree 风格引擎 |
|---|---|---|
| 核心思想 | 追加写入 + 后台合并 | 原地维护有序页结构 |
| 写入模式 | WAL + MemTable，磁盘顺序写 SSTable | 定位叶子页后修改，随机写更多 |
| 写吞吐 | 通常更强，适合写密集 | 写入随机性更高，吞吐受页更新影响 |
| 点查 | 可能查多层，需要 Bloom Filter 优化 | 从根到叶子，路径稳定 |
| 范围查询 | 可做，但可能要合并多层结果 | 叶子链表天然友好 |
| 空间占用 | 可能有旧版本、tombstone、compaction 临时空间 | 通常更稳定，但有页碎片 |
| 后台任务 | compaction 是核心机制 | 有刷脏页、页整理，但无 LSM 式多层归并 |
| 延迟特征 | 平均写快，但可能有 compaction 尖刺 | 延迟更受随机 I/O、锁和页分裂影响 |
| 典型系统 | RocksDB、LevelDB、Cassandra、HBase | MySQL InnoDB、PostgreSQL B-Tree Index |

一句话：

```text
B+Tree：读路径更直接，写入要维护原地有序结构。
LSM：写路径更顺滑，读取和整理复杂度转移给后台与多层查询。
```

## 10. 三种放大：理解存储引擎取舍的钥匙

存储引擎经常用三种放大来比较。

### 10.1 写放大 (Write Amplification)

用户写入 1 字节，底层实际写了多少字节。

- B+Tree：页修改、页分裂、日志、刷脏页会带来写放大；
- LSM：WAL + flush + 多轮 compaction 会带来写放大。

LSM 不是没有写放大，而是把随机写变顺序写后，再用后台批量重写换吞吐。

### 10.2 读放大 (Read Amplification)

为了读一个 key，需要检查多少位置。

- B+Tree：通常沿一条树路径；
- LSM：可能查 MemTable、多层 SSTable、多个文件。

Bloom Filter 能降低“查不存在 key”的成本，但不能完全消除多层结构带来的复杂度。

### 10.3 空间放大 (Space Amplification)

存储用户数据 1 份，底层占用了多少份空间。

- LSM：旧版本、tombstone、compaction 临时文件会增加空间占用；
- B+Tree：页预留空间、碎片、MVCC 旧版本也会占空间。

三者无法同时最优：

```text
更低写放大  ↔  可能更高读放大 / 空间放大
更低读放大  ↔  可能需要更积极 compaction，增加写放大
更低空间放大 ↔  可能需要更频繁整理，增加写入成本
```

## 11. 为什么说 LSM 是写密集场景下的王者？

因为它把前台写入路径设计得非常短：

```text
前台写入关键路径：
WAL 顺序追加 + MemTable 内存更新
```

这特别适合：

- 日志、事件、指标、时序数据；
- 高吞吐 key-value 写入；
- 写多读少或写多读可被缓存优化的场景；
- 分布式存储中大量顺序落盘、后台归并的场景。

典型系统：

- LevelDB / RocksDB：嵌入式 KV 存储引擎；
- Cassandra：分布式宽列数据库；
- HBase：Hadoop 生态中的宽列存储；
- TiKV / CockroachDB 某些底层实现也大量借鉴 RocksDB/LSM 思路。

它强在：**把写入压力吸收到内存和顺序日志中，再把随机性转成后台批处理。**

## 12. LSM 的代价：它不是银弹

LSM 的代价主要集中在读、空间和后台调度。

### 12.1 读路径更复杂

读一个 key 可能需要检查多个层级。即使有 Bloom Filter，也需要维护缓存、索引和文件元信息。

### 12.2 范围查询可能需要多路归并

B+Tree 范围查询通常定位起点后沿叶子链表扫。LSM 范围查询则可能要同时扫描多个 SSTable，并按 key 归并出最新版本。

```text
Range Scan [a..z]
  ↓
MemTable iterator
L0 file iterator
L1 file iterator
L2 file iterator
  ↓
多路归并，过滤旧版本和 tombstone
```

### 12.3 Compaction 可能导致延迟尖刺

如果后台 compaction 跟不上写入，系统可能出现：

- 写入被限速；
- flush 堆积；
- 磁盘 I/O 被 compaction 吃满；
- P99 延迟升高。

### 12.4 参数调优复杂

LSM 有很多关键参数：

| 参数 | 影响 |
|---|---|
| MemTable 大小 | flush 频率、内存占用、写入缓冲能力 |
| Level 大小比例 | 写放大、空间放大、读放大 |
| Compaction 策略 | 延迟、吞吐、空间回收 |
| Bloom Filter bits/key | 内存占用 vs 假阳性率 |
| Block size | 点查、范围查、压缩效率 |
| Cache 大小 | 读性能和内存成本 |

所以 LSM 的工程难点不是“写入很快”这句话，而是如何让后台整理不反噬前台性能。

## 13. Compaction 策略：Size-tiered 和 Leveled

常见 compaction 大致有两种思路。

### 13.1 Size-Tiered Compaction

把大小相近的 SSTable 凑够一批后合并。

```text
小文件 + 小文件 + 小文件
          ↓
       中文件

中文件 + 中文件 + 中文件
          ↓
       大文件
```

特点：

- 写放大较低；
- 空间放大可能较高；
- 同一 key 可能分布在较多文件中，读放大较高；
- 常见于写入吞吐优先的系统。

### 13.2 Leveled Compaction

把数据组织成多个 level，每层大小逐渐放大，并尽量保证低层同一范围不重叠。

```text
L0: 多个可能重叠的小文件
L1: 范围尽量不重叠
L2: 范围尽量不重叠，容量更大
L3: 更大
```

特点：

- 读放大更可控；
- 空间放大较低；
- 写放大更高，因为数据可能被多次重写到下一层；
- 适合读写混合、点查较多的场景。

## 14. 如何选择：什么时候用 LSM，什么时候用 B+Tree？

### 更偏向 LSM-Tree 的场景

- 写入吞吐远高于读取；
- 写入 key 分布随机；
- 可以接受后台 compaction；
- 点查可通过缓存和 Bloom Filter 优化；
- 数据有生命周期，批量过期、批量合并可接受；
- KV、日志、时序、事件流、宽列存储。

### 更偏向 B+Tree 的场景

- 读多写少或读写均衡；
- 范围查询、排序、分页非常重要；
- 低延迟点查和范围扫是核心；
- 事务型关系数据库场景；
- 数据更新不极端密集，缓存命中较好；
- 希望性能模型更直观，后台合并压力较小。

可以把两者理解为不同哲学：

```text
B+Tree 哲学：
每次写入时，把数据放到正确位置，保持结构随时整齐。

LSM 哲学：
先快速记录变化，之后通过后台合并逐步恢复整齐。
```

## 15. 和 MySQL 的关系：为什么常拿 InnoDB B+Tree 对比？

MySQL InnoDB 的聚簇索引和二级索引都基于 B+Tree 思路，因此它代表了传统关系型数据库中非常成熟的页式索引结构。

对比时常说：

- InnoDB / B+Tree 更适合事务型、读写均衡、范围查询友好的 OLTP；
- RocksDB / LSM 更适合高写入吞吐、KV 模型、后台 compaction 可控的场景。

但这不是“谁淘汰谁”。现实系统经常混合使用：

- MySQL 生态有 MyRocks，把 RocksDB 作为 MySQL 存储引擎；
- 一些系统上层提供 SQL，下层使用 LSM KV；
- B+Tree 系统也有 redo log、change buffer、buffer pool 等机制缓解随机写；
- LSM 系统也通过 Bloom Filter、block cache、compaction 策略改善读取。

真正的问题不是“哪个更先进”，而是：**你的工作负载更像哪一种？**

## 16. 最小心智模型：一张图记住二者差异

```text
B+Tree：原地有序

写入 key=K
   │
   ▼
根节点 → 内部节点 → 叶子页
                    │
                    ▼
              修改正确位置
                    │
                    ▼
              页分裂 / 刷脏页

优势：读路径直接，范围扫友好
代价：随机写压力更明显
```

```text
LSM-Tree：追加 + 合并

写入 key=K
   │
   ▼
WAL 顺序追加 → MemTable 内存更新
   │
   ▼
flush 成 SSTable
   │
   ▼
后台 compaction 合并整理

优势：写路径短，吞吐强
代价：读放大、空间放大、compaction 复杂
```

## 17. 面试 / 复盘时的高质量回答框架

如果被问“LSM-Tree 和 B+Tree 有什么区别”，可以这样答：

1. **从写入路径说**：B+Tree 原地维护页结构，LSM 先 WAL + MemTable，再 flush SSTable；
2. **从读路径说**：B+Tree 一条树路径，LSM 可能查多层文件，需要 Bloom Filter 和 cache；
3. **从后台机制说**：LSM 依赖 compaction 清理旧版本、删除标记和层级；
4. **从三种放大说**：LSM 用读放大 / 空间放大 / compaction 写放大换顺序写吞吐；
5. **从场景说**：写密集、高吞吐 KV 偏 LSM；读多、范围查询、事务型 OLTP 偏 B+Tree。

一句高级总结：

> B+Tree 把维护有序性的成本放在每次写入当下；LSM-Tree 把写入先日志化和内存化，再把维护有序性的成本延迟到后台 compaction。

## 18. 总结

LSM-Tree 和 B+Tree 都是在回答同一个问题：

> 如何在海量数据中同时支持快速写入、快速读取和有序访问？

它们的答案不同：

- **B+Tree**：持续维护一个可原地更新、适合页式 I/O 的有序树；
- **LSM-Tree**：把变化先顺序记录下来，再用后台归并维持整体有序。

所以，LSM-Tree 不是简单地“比 B+Tree 快”，而是在写密集场景下做了更激进的工程取舍：

```text
用顺序写吞吐
换取后台 compaction
再用 Bloom Filter / Cache / 分层策略
把读放大控制在可接受范围内
```

> [!tip]
> 学 LSM-Tree，最重要的不是记住 MemTable、SSTable、Compaction 这些名词，而是理解它的哲学：**前台写入尽量轻，后台合并承担复杂度。**
