import * as esbuild from "esbuild";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../..");

// this is a test
const CACHE = new Map();

async function resolveDeps(entryFile) {
  if (CACHE.has(entryFile)) {
    return CACHE.get(entryFile);
  }

  const result = await esbuild.build({
    entryPoints: [path.resolve(rootDir, entryFile)],
    bundle: true,
    format: "esm",
    platform: "node",
    write: false,
    metafile: true,
  });

  const inputs = result.metafile.inputs;
  const deps = Object.keys(inputs)
    .filter((f) => !f.includes("node_modules"))
    .map((f) => path.relative(rootDir, f));

  CACHE.set(entryFile, deps);
  return deps;
}

export { resolveDeps };
