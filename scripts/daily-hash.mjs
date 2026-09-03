import { createHash } from "node:crypto";

export const sha256 = (value) => createHash("sha256").update(value, "utf8").digest("hex");

export const articleNeedsUpdate = ({
  sourceHash,
  cachedHash,
  targetHash,
  outputExists,
  windowChanged = false,
}) => (
  windowChanged
  || !outputExists
  || sourceHash !== cachedHash
  || sourceHash !== targetHash
);
