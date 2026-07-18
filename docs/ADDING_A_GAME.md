# Add or migrate a game

Use this checklist for each game moved to `gilmore.games/<slug>/`.

## 1. Pick the public slug

Use lowercase kebab-case and keep it stable:

```text
pokemon
marble-run
race-to-kaitoke
```

The production base path includes leading and trailing slashes:

```text
/pokemon/
```

## 2. Configure the game

### Vite

Copy `templates/vite.config.ts` into the game repository and replace `GAME_SLUG`.

Prefer an environment variable so local development can remain at `/`:

```ts
const base = process.env.VITE_BASE_PATH || '/';
```

Set `VITE_BASE_PATH=/pokemon/` in the Vercel production environment.

### Next.js

Use the settings shown in `templates/next.config.mjs`. Next.js base-path values do not end in `/`:

```text
/pokemon
```

### React Router

Set the router basename:

```tsx
<BrowserRouter basename="/pokemon">
```

### Plain HTML or JavaScript

Prefer relative paths:

```html
<script src="./game.js"></script>
<img src="./assets/cover.png" alt="">
```

Avoid root-relative paths:

```html
<script src="/game.js"></script>
```

## 3. Audit path-sensitive code

Search the game repository for:

```text
src="/
href="/
url(/
fetch('/
location.href = '/
navigate('/
new URL('/
serviceWorker.register('/
```

Not every match is wrong, but every match should be reviewed.

## 4. Test the game build

The built HTML should reference assets beneath the game path, for example:

```text
/pokemon/assets/index-abc123.js
```

Test:

- initial load
- hard refresh
- nested routes
- images and sprites
- music and sound effects
- JSON or level data
- fullscreen mode
- keyboard, touch, and controller input
- saved games
- web manifest and service worker, where present

## 5. Add the gateway rewrite

Copy `templates/vercel.json` to the directory repository or merge the new rules into its existing `vercel.json`.

Replace:

```text
GAME_SLUG
GAME_PROJECT.vercel.app
```

Add both a bare-path and wildcard rewrite:

```json
{
  "source": "/pokemon",
  "destination": "https://pokemon-game.vercel.app/"
},
{
  "source": "/pokemon/:path*",
  "destination": "https://pokemon-game.vercel.app/:path*"
}
```

## 6. Update the directory card

Change the card URL to the canonical path:

```html
<a href="/pokemon/" class="game-card">
```

Use the canonical Gilmore Games URL everywhere public rather than the underlying Vercel URL.

## 7. Verify production

After Vercel deploys the directory project, verify:

```text
https://gilmore.games/pokemon/
```

Also check browser developer tools for failed requests and path-related console errors.

## Common failures

### Homepage loads but assets 404

The game still generates root-relative asset paths. Correct its framework base-path configuration.

### Direct navigation works but refresh fails

The game needs an SPA fallback or framework-specific route handling in its own project.

### Game links jump back to the domain root

Internal navigation still assumes `/` is the game's homepage. Use the configured base path.

### Service worker controls other games

Restrict its registration and scope to the game's directory, or disable it until deliberately configured.

### API calls go to the wrong project

Static rewrites proxy game paths, but API architecture needs explicit design. Use absolute API origins or add dedicated gateway rules rather than assuming `/api` belongs to the game.
