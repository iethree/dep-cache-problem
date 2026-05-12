#!/usr/bin/env node
import { hashDirectory } from "./lib/hash.js";
import { downloadArtifact } from "./lib/github.js";
import { buildDep } from "./lib/build.js";
import { isCacheFresh, getMeta } from "./lib/cache.js";
import { execSync } from "child_process";

function getRepo() {
  if (process.env.GITHUB_REPOSITORY) {
    return process.env.GITHUB_REPOSITORY;
  }
  const url = execSync("git remote get-url origin", {
    encoding: "utf8",
  }).trim();
  const match = url.match(/[:/]([^/]+)\/([^/]+?)(?:\.git)?$/);
  if (!match) throw new Error("Could not determine repo from git remote");
  return `${match[1]}/${match[2]}`;
}

async function fetchDep() {
  if (!process.env.CI) {
    const hash = await hashDirectory();
    const artifactName = `dep-bin-${hash}`;
    const token = process.env.GITHUB_TOKEN;

    if (token) {
      const [owner, repo] = getRepo().split("/");
      console.log(`Looking for artifact: ${artifactName}`);
      const found = await downloadArtifact(owner, repo, artifactName, token);
      if (found) {
        console.log("Downloaded cached dep.bin");
        const meta = getMeta();
        if (meta && meta.hash === hash) {
          console.log(`Hash verified: ${hash} ✅`);
        } else {
          console.log(
            `Hash mismatch! ❌ Expected: ${hash}, got: ${meta?.hash ?? "none"}`,
          );
        }
        return;
      }
      console.log("No artifact found — building locally");
    } else {
      console.log("GITHUB_TOKEN not set — building locally");
      console.log("  To enable artifact download, set GITHUB_TOKEN env var");
      console.log("  Get token: https://github.com/settings/tokens");
      console.log(
        "  Set in your shell profile or terminal session: export GITHUB_TOKEN=your_token_here",
      );
      console.log(
        "  You can also obtain this token from running 'gh auth token'",
      );
    }
  }

  await buildDep();
}

async function main() {
  const cmd = process.argv[2];

  if (cmd === "fetch") return fetchDep();
  if (cmd === "build") {
    if (await isCacheFresh()) {
      console.log("Cache is fresh — skipping build");
      return;
    }
    return fetchDep();
  }

  console.log("Usage:");
  console.log("  depcli fetch   # download or rebuild");
  console.log("  depcli build  # fetch if stale, otherwise skip");
}

main();
