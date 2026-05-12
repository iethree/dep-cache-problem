import fs from "fs";
import { execSync } from "child_process";

async function downloadArtifact(owner, repo, name, token) {
  const list = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/actions/artifacts`,
    { headers: { Authorization: `Bearer ${token}` } },
  ).then((r) => r.json());

  const sorted = [...list.artifacts].sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
  );
  const artifact = sorted.find((a) => a.name === name);
  if (!artifact) return false;

  const zip = await fetch(artifact.archive_download_url, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.arrayBuffer());

  fs.writeFileSync("dep-artifact.zip", Buffer.from(zip));
  execSync("unzip -o dep-artifact.zip -d dist");
  return true;
}

export { downloadArtifact };
