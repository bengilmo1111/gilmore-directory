# Path-based game migration plan

## Goal

Move games from separate public Vercel URLs to stable directory URLs on `gilmore.games` without combining their codebases.

```text
https://gilmore.games/<game-slug>/
```

## Architecture

The directory project owns `gilmore.games` and acts as a reverse-proxy gateway. Each game continues to deploy independently.

```text
Browser
  -> gilmore.games/pokemon/
  -> directory project's Vercel rewrite
  -> pokemon-game.vercel.app/
```

The browser retains the `gilmore.games/pokemon/` address.

## Phase 1: establish standards

Before migrating a game:

- Choose a lowercase kebab-case slug.
- Confirm the game has its own working Vercel deployment.
- Identify its framework and routing library.
- Find absolute asset URLs such as `/assets/image.png`.
- Find navigation calls that assume the site root, including `location.href = '/'`.
- Decide whether saved-game keys, service workers, or manifests need namespacing.

Recommended slugs:

```text
/pokemon/
/golf/
/te-riri/
/chemistry/
/marble-run/
/race-to-kaitoke/
/super-alicetown/
```

## Phase 2: pilot one game

Start with a small static or Vite game with no authentication or backend dependencies.

1. Configure its production base path.
2. Build and test it locally under that path.
3. Deploy the game project.
4. Add a rewrite to the directory project's `vercel.json`.
5. Update the directory card to use the new Gilmore Games URL.
6. Test direct links, refreshes, assets, audio, saved state, mobile controls, and fullscreen mode.
7. Keep the old URL available as a fallback.

## Phase 3: migrate games incrementally

Migrate one game per change. Do not add a batch of untested rewrites.

Suggested order:

1. Plain HTML/JavaScript games.
2. Vite and Phaser games.
3. React SPA games.
4. Next.js games.
5. Games with APIs, authentication, service workers, or persistent storage.

## Phase 4: standardise new projects

Every new game should declare a single base-path setting and use it consistently for:

- JavaScript bundles
- images and sprites
- audio
- CSS
- fetch requests for static data
- router configuration
- web manifests
- service workers
- links back to the directory

Use the examples under `templates/` as a starting point.

## Phase 5: automate later

Once several games are migrated successfully, replace manually maintained rewrites with a small registry and generation script.

Potential registry entry:

```json
{
  "slug": "pokemon",
  "origin": "https://pokemon-game.vercel.app",
  "title": "Pokemon Card Trainer",
  "status": "live"
}
```

Automation is deliberately deferred until the manual pattern has been proven.

## Rewrite pattern

```json
{
  "rewrites": [
    {
      "source": "/pokemon/:path*",
      "destination": "https://pokemon-game.vercel.app/:path*"
    }
  ]
}
```

Add a separate rule for the bare path if testing shows the framework does not normalize it:

```json
{
  "source": "/pokemon",
  "destination": "https://pokemon-game.vercel.app/"
}
```

## Rollback

If a migration fails:

1. Remove or revert that game's rewrite.
2. Restore the directory card's original `.vercel.app` link.
3. Redeploy the directory project.
4. Fix the game in its own repository before trying again.

Because the game project remains independently deployed, rollback does not require moving code or rebuilding other games.

## Definition of done for each game

- The game loads at its `gilmore.games/<slug>/` URL.
- A direct visit to a nested route works where applicable.
- Refreshing does not produce a 404.
- All images, audio, fonts, scripts, and data files load.
- Browser console shows no path-related errors.
- Mobile and desktop controls work.
- Saved state does not collide with another game.
- The directory links to the new URL.
- The original deployment remains available for diagnostics.
