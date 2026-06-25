---
layout: layouts/documentation.njk
title: Setup
description: How to run BlastoDB locally.
---

[hero: text-align:center]

<h-hero>Setup</h-hero>

How to run BlastoDB on your own machine.

[:hero]

# You Need

- **Node.js 24** (the version CI builds with) and npm.
- **git**, and read/write access to the [`Tsaousis-Lab/blastodb`](https://github.com/Tsaousis-Lab/blastodb) repository.

# Install

```bash
git clone https://github.com/Tsaousis-Lab/blastodb.git
cd blastodb
npm install
```

## Run

```bash
npm run serve 
```

This builds the server at `http://localhost:8080/`. The [Sveltia CMS](/documentation/technical/sveltia-cms/) can be reached locally under `http://localhost:8080/admin/`.

## Path prefix

The live site is served from a subpath (`/blastodb`), so CI builds with `PATH_PREFIX=/blastodb`.
Locally `PATH_PREFIX` is unset and defaults to `/`, so links resolve at the root. Only set it if you
need to reproduce the production paths:

```bash
PATH_PREFIX=/blastodb npm run build
```

→ [Tech Stack](/documentation/technical/tech-stack/) &nbsp;|&nbsp; [Project Structure](/documentation/technical/project-structure/) &nbsp;|&nbsp; [Deployment](/documentation/technical/deployment/)

---

[box: text-align:center]

[btn: <- Back to Technical Docs -> /documentation/technical/]

[:box]
