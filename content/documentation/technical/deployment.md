---
layout: layouts/documentation.njk
title: Deployment
description: How BlastoDB is built, published, and hosted.
---

[hero: text-align:center]

<h-hero>Deployment</h-hero>

BlastoDB is built by GitHub Actions and hosted on **GitHub Pages** at
[www.blastodb.com](https://www.blastodb.com).

[:hero]

# Hosting

BlastoDB is hosted on GitHub using GitHub Pages. The public domain is `www.blastodb.com`.

# Branches

The Git repository has the following branches, with the following purposes:
| Branch | Role |
|---|---|
| `dev` | Developer work (code/features). Build-checked, not deployed. |
| `staging` | Content from the CMS lands here and is build-checked before release. |
| `main` | The live site. Every push deploys. |

# GitHb Action Workflows


| Workflow | Trigger | Does |
|---|---|---|
| `check.yml` (Build Check) | push to `staging`/`dev`, PR to `main` | Builds the site; fails on broken content. No deploy. |
| `publish.yml` (Publish) | daily 05:30 UTC + manual | Build-gates `staging`, merges `staging → main`, dispatches Deploy and Sync. |
| `deploy.yml` (Build and Deploy Live Site) | push to `main` + manual | Builds with `PATH_PREFIX=/blastodb`, deploys to GitHub Pages. |
| `sync-staging.yml` (Sync) | push to `main` + manual | Merges `main → staging` to keep them aligned. |

# Editorial flow

The editorial workflow from a system perspective is:

1. An editor saves in the CMS → a commit on **`staging`**.
2. **Build Check** runs on `staging`; a broken build blocks the release.
3. Once a day at **05:30 UTC**, the **Publish** workflow on GitHub actions build-gates `staging` and merges it into
   `main` (it can also be run on demand).
4. The push to `main` triggers **Deploy**, which builds and publishes to GitHub Pages.

So routine edits go live in the next daily publish, not instantly. To publish sooner, run the
Publish workflow by hand — see [Checking &amp; Publishing](/documentation/editors_guide/deployment-status/).

---

→ [Setup](/documentation/technical/setup/) &nbsp;|&nbsp; [Checking &amp; Publishing (for editors)](/documentation/editors_guide/deployment-status/)

[box: text-align:center]

[btn: <- Back to Technical Docs -> /documentation/technical/]

[:box]
