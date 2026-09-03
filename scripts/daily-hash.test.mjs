import test from "node:test";
import assert from "node:assert/strict";
import { articleNeedsUpdate, sha256 } from "./daily-hash.mjs";

test("sha256 returns a stable article content hash", () => {
  assert.equal(
    sha256("hello"),
    "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
  );
});

test("article hash mismatch requests an incremental update", () => {
  assert.equal(
    articleNeedsUpdate({
      sourceHash: "new",
      cachedHash: "old",
      targetHash: "old",
      outputExists: true,
    }),
    true,
  );
});

test("matching hashes avoid rewriting an existing article", () => {
  assert.equal(
    articleNeedsUpdate({
      sourceHash: "same",
      cachedHash: "same",
      targetHash: "same",
      outputExists: true,
    }),
    false,
  );
});

test("a drifted mirror triggers an incremental update", () => {
  assert.equal(
    articleNeedsUpdate({
      sourceHash: "source",
      cachedHash: "source",
      targetHash: "drifted",
      outputExists: true,
    }),
    true,
  );
});

test("missing output or changed navigation window requests an update", () => {
  assert.equal(
    articleNeedsUpdate({
      sourceHash: "same",
      cachedHash: "same",
      targetHash: "same",
      outputExists: false,
    }),
    true,
  );
  assert.equal(
    articleNeedsUpdate({
      sourceHash: "same",
      cachedHash: "same",
      targetHash: "same",
      outputExists: true,
      windowChanged: true,
    }),
    true,
  );
});
