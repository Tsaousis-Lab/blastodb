---
layout: layouts/documentation.njk
title: Checking & Publishing
description: For editors — check that your CMS changes build, see the deployment status, and publish now.
---

[hero: text-align:center]

<h-hero>Checking &amp; Publishing</h-hero>

[:hero]

What happens after you click **Save** in the CMS, and how to check it — no coding needed.

# What happens to your edit

When you save, your change is committed to the **staging** copy of the site. GitHub automatically
checks that it still builds. Once a day at **05:30 UTC** the checked content is published to the live
site, [www.blastodb.com](https://www.blastodb.com). To publish sooner, see [Publish now](#publish-now).

# 1. Check your edit built

A broken markdown element can stop the site from building. To check:

1. Open the Actions page: [github.com/Tsaousis-Lab/blastodb/actions](https://github.com/Tsaousis-Lab/blastodb/actions).
2. Find the most recent **Build Check** run (it runs after each CMS save).
3. 🟢 green check = your change is fine. 🔴 red ✗ = something broke — fix it in the CMS, or undo it
   (see [Rolling Back a Change](/documentation/editors_guide/rollback/)).

# 2. Check the live site updated

1. On the same [Actions page](https://github.com/Tsaousis-Lab/blastodb/actions), look for the latest
   **Publish content** and **Build and Deploy Live Site** runs.
2. Wait for them to finish (🟡 → 🟢, usually one to three minutes).
3. Open [www.blastodb.com](https://www.blastodb.com) and hard-refresh — Ctrl+Shift+R (Windows) or
   Cmd+Shift+R (Mac) — to see the newest version.

# 3. Publish now {#publish-now}

To push checked content live without waiting for the daily publish:

1. Go to [github.com/Tsaousis-Lab/blastodb/actions](https://github.com/Tsaousis-Lab/blastodb/actions).
2. In the left sidebar, click **Publish content (staging → main)**.
3. Click **Run workflow** → keep the branch as is → **Run workflow**.
4. Watch the run finish (🟢), then check the live site as in step 2.

[card: class:tip]
Nothing publishes if the build is broken — the publish step checks it first. So you can't take the
live site down by saving a bad edit; it just won't go live until it's fixed.
[:card]
