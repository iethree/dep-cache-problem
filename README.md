# Cached dependency

`npm run build` builds a script (`dist/dep.bin`) that takes a *very long time* (let's assume) to build, but is required for our application to run.

Currently, we build this on every CI run hundreds of times a day, and it's costing us a ton of money. We want to reduce CI costs by only building this dependency when any of its underlying code changes, but not when other code that merely depends on it changes. Implement a caching mechanism in github actions that uses a cached version of the binary when possible, but rebuilds it when needed.

In addition, developers need to have this dependency on their local machines, and also want to avoid unnecessarily local builds, so they should also be able to fetch cached artifacts. Care should be taken to make sure that developers aren't inadvertently using a stale cache locally.
