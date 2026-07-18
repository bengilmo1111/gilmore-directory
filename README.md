# Gilmore Games Directory

This repository hosts the homepage for [gilmore.games](https://gilmore.games) and is the documentation home for moving independently deployed games onto directory-style URLs.

## Target architecture

Each game remains in its own GitHub repository and Vercel project, while this directory project acts as the public gateway:

```text
gilmore.games/                  -> this directory app
gilmore.games/pokemon/         -> Pokemon game project
gilmore.games/golf/            -> Golf game project
gilmore.games/te-riri/         -> Te Riri game project
```

Vercel rewrites proxy each path to the corresponding project's `.vercel.app` deployment. Visitors stay on `gilmore.games/<game>`.

## Documentation

- [Migration plan](docs/MIGRATION_PLAN.md)
- [How to add or migrate a game](docs/ADDING_A_GAME.md)
- [Templates](templates/README.md)

## Core rules

1. Each game keeps its own repository and Vercel project.
2. Public URLs use lowercase kebab-case slugs.
3. Every game must support running beneath a base path such as `/pokemon/`.
4. Internal asset and navigation URLs must respect that base path.
5. Migrate and test one game at a time.
6. Keep the original `.vercel.app` deployment available for rollback and diagnostics.

## Repository structure

```text
index.html                  Current Gilmore Games directory homepage
docs/                       Platform and migration documentation
templates/                  Copyable configuration examples
vercel.json                 Gateway rewrite rules once games are migrated
```

## Current status

`gilmore.games` is connected to this Vercel project. The next step is to select a low-risk game, configure it for a base path, and add the first production rewrite.
