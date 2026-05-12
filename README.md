# Cached dependency

`npm run build` builds a script (`dist/dep.bin`) that takes a _very long time_ (let's assume) to build, but is required for our application to run.

Currently, we build this on every CI run hundreds of times a day, and it's costing us a ton of money. We want to reduce CI costs by only building this dependency when any of its underlying code changes, but not when other code that merely depends on it changes. Implement a caching mechanism in github actions that uses a cached version of the binary when possible, but rebuilds it when needed.

In addition, developers need to have this dependency on their local machines, and also want to avoid unnecessarily local builds, so they should also be able to fetch cached artifacts. Care should be taken to make sure that developers aren't inadvertently using a stale cache locally.

## Developer Setup

### Install dependencies

```bash
npm install
```

### Available commands

| Command           | Description                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| `npm run build`   | Build the dependency (downloads cached artifact from GitHub if available, otherwise builds locally) |
| `npm run test`    | Run tests in watch mode                                                                             |
| `npm run test:ci` | Run tests once (CI mode)                                                                            |
| `npm run start`   | Run the main application                                                                            |

### Local helper commands

```bash
# Show which files are used for cache hash computation
node scripts/lib/resolve-hash-files.js --files

# Show current cache hash value
node scripts/lib/resolve-hash-files.js --hash
```

## How Caching Works

The caching mechanism uses a hash computed from all transitive source dependencies. When you run `npm run build`:

1. It computes a hash based on the content of all files that `util/build.js` depends on (via esbuild dependency analysis)
2. The artifact name becomes `dep-bin-<hash>`
3. If you're logged into GitHub (via `GITHUB_TOKEN`), it tries to download the cached artifact
4. If the artifact exists, it's extracted to `dist/` and used directly (skips the slow build)
5. If not found, it builds locally and the new hash can be committed to CI to create the artifact for next time

### Setting up GITHUB_TOKEN locally

To enable downloading cached artifacts from GitHub:

1. Create a token at https://github.com/settings/tokens (no special permissions needed for public repos)
2. Or run `gh auth token` if you have the GitHub CLI installed
3. Set it in your terminal:

```bash
export GITHUB_TOKEN=your_token_here
```

Or add it to your shell profile (`~/.zshrc` or `~/.bashrc`) for persistence.

## Troubleshooting

### Local hash doesn't match CI (artifact not found)

If you see:

```
Looking for artifact: dep-bin-8bb3a7dcbbe410a6
No artifact found — building locally
```

But CI shows a different hash like `dep-bin-f2bcc83b7dee4f62`, it means the files used for hash computation differ between local and CI.

Run locally:

```bash
node scripts/lib/resolve-hash-files.js --files
```

Compare with what CI computed (check the "Compute dependency hash" step in the workflow log). If they differ, ensure both are using the same dependency resolution (esbuild-based).

### Debugging artifact names

In GitHub Actions workflow logs, look for:

- "Restore cached dependency" step - shows whether cache hit or miss occurred
- "Upload artifact" step - shows the artifact name being uploaded (only on cache miss)
