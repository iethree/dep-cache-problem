import fs from "fs";
import crypto from "crypto";
import { resolveDeps } from "./deps.js";

const META_FILE = "dist/dep.bin.meta.json";

async function hashDirectory() {
  const DEP_SOURCE_FILES = await resolveDeps("util/build.js");
  const hash = crypto.createHash("sha256");
  for (const file of DEP_SOURCE_FILES) {
    hash.update(fs.readFileSync(file));
  }
  return hash.digest("hex").slice(0, 16);
}

function getMeta() {
  if (!fs.existsSync(META_FILE)) return null;
  try {
    return JSON.parse(fs.readFileSync(META_FILE, "utf8"));
  } catch {
    return null;
  }
}

async function isCacheFresh() {
  const meta = getMeta();
  if (!meta) return false;
  const currentHash = await hashDirectory();
  if (meta.hash !== currentHash) return false;
  if (!fs.existsSync("dist/dep.bin")) return false;
  return true;
}

async function writeMeta() {
  const currentHash = await hashDirectory();
  fs.mkdirSync("dist/", { recursive: true });
  fs.writeFileSync(
    META_FILE,
    JSON.stringify(
      { hash: currentHash, builtAt: new Date().toISOString() },
      null,
      2,
    ),
    "utf8",
  );
}

export { hashDirectory, isCacheFresh, writeMeta, getMeta };
