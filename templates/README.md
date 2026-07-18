# Templates

These files are copyable starting points for hosting independent game projects beneath `gilmore.games/<slug>/`.

## Files

- `vercel.json` — gateway rewrite example for the directory project.
- `vite.config.ts` — Vite production base-path configuration.
- `next.config.mjs` — Next.js base-path configuration.
- `game-manifest.json` — proposed metadata format for later directory automation.

Replace all uppercase placeholders before use.

## Important

The templates are examples, not files that should all be copied blindly. Each game should use the configuration appropriate to its framework.

For the first migrations, update the directory project's root `vercel.json` manually. Once the pattern is stable across several games, add a registry and build script to generate rewrite rules and directory cards.
