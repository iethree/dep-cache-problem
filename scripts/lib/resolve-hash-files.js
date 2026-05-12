import { resolveDeps } from "./deps.js";
import crypto from "crypto";
import fs from "fs";

async function getHashFiles() {
  const DEP_SOURCE_FILES = await resolveDeps("util/build.js");
  return DEP_SOURCE_FILES;
}

async function computeHash() {
  const files = await getHashFiles();
  const hash = crypto.createHash("sha256");
  for (const file of files) {
    hash.update(fs.readFileSync(file));
  }
  return hash.digest("hex").slice(0, 16);
}

const output = process.argv[2];

if (output === "--files") {
  getHashFiles().then((files) => console.log(files.join("\n")));
} else if (output === "--hash") {
  computeHash().then((h) => console.log(h));
}
