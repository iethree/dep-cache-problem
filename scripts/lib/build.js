import { execSync } from "child_process";
import { writeMeta } from "./cache.js";

async function buildDep() {
  execSync("node ./util/build.js", { stdio: "inherit" });
  await writeMeta();
}

export { buildDep };
