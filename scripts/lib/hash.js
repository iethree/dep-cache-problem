import crypto from "crypto";
import fs from "fs";
import { resolveDeps } from "./deps.js";

async function hashDirectory() {
  const DEP_SOURCE_FILES = await resolveDeps("util/build.js");
  const hash = crypto.createHash("sha256");
  for (const file of DEP_SOURCE_FILES) {
    hash.update(fs.readFileSync(file));
  }
  return hash.digest("hex").slice(0, 16);
}

function fileHash(path) {
  return crypto
    .createHash("sha256")
    .update(fs.readFileSync(path))
    .digest("hex");
}

export { hashDirectory, fileHash };
