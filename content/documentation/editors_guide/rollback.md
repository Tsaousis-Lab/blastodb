---
layout: layouts/documentation.njk
title: Rolling Back a Change
description: How to undo a recent change on GitHub if something breaks after a data entry.
---

[hero: text-align:center]

<h-hero>Rolling Back a Change</h-hero>

[:hero]

If you notice that something looks wrong on the website, ur the build failed after saving a change in the CMS, you can undo it directly on GitHub.

## Step 1 - Open the commit history on GitHub

Go to [github.com/Tsaousis-Lab/blastodb/commits/main/](https://github.com/Tsaousis-Lab/blastodb/commits/main/). Make sure you are logged in.

## Step 2 - Find the change you want to undo

Each line in the list is one saved change. The most recent changes are at the top. Look for the entry that corresponds to what you edited. ==TODO: how are the commits named?==

## Step 3 - Revert the commit

1. Click the **commit message** (the title of "commit", probably something like "Update Page "subtypes") to open that commit's detail page
2. You will see a list of the exact changes that were made — green lines were added, red lines were removed
3. If this is the change you want to undo, click the **`...`** menu button in the top-right corner of the page
4. Select **Revert**

GitHub will prepare a new change that does the exact opposite of the original — effectively undoing it.

## Step 4 - Confirm the revert

GitHub opens a form titled **"Revert …"**. Leave everything as it is and click **Propose changes**, then on the next screen click **Create pull request**, and finally **Merge pull request** → **Confirm merge**.

The undo is now saved. The website will rebuild automatically within a few minutes and the problem should be gone.

---

## If you are not sure what to undo

If several changes were made around the same time and you cannot tell which one caused the problem, **contact Tasos**. He can look at the history and identify the right commit to revert. Do not revert multiple commits at once unless you are certain — reverting the wrong thing can introduce new problems.

---

## Prevention tip

Before making a large batch of changes (e.g. updating many datasets at once), it is a good idea to note the date and time. That makes it much easier to find the relevant commits in the history if something needs to be undone later.
