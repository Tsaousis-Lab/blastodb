---
layout: layouts/documentation.njk
title: Rolling Back a Change
description: How to undo a recent change on GitHub if something breaks after a data entry.
---

[hero: text-align:center]

<h-hero>Reverting a Change</h-hero>

[:hero]


You (almost) can't break the live website by accident.

Content is edited from a "staging" branch, which gets merged into the live website once a day (at 5:30 UTC). In the [commit history](https://github.com/Tsaousis-Lab/blastodb/commits/) you can find these merges for each day.

# Can you fix it in the CMS?

If you spot your mistake and can fix it within the CMS, then great! Just remove the markdown elements that broke the site, and [re-run the build pipeline by hand](/documentation/editors_guide/deployment-status/#publish-now).

# If you can't fix in in the CMS

[card: class:warning]
⚠️ **Important:** this undoes all changes made in one day from you and anyone else. Amy changes made in or after the pull request you have reverted will be lost, and need to be re-entered through the CMS.

If need to revert a change like this, you and everyome else need to stop editing BlastoDB before the site is updated again.

[:card]


1. Open the list of publishes: [https://github.com/Tsaousis-Lab/blastodb/pulls?q=is%3Apr+Daily+content+publish](https://github.com/Tsaousis-Lab/blastodb/pulls?q=is%3Apr+Daily+content+publish)
2. Click the most recent "Daily content publish — [date]" (the day the problem went live).
3. Scroll to the bottom of that page and click Revert.
4. GitHub opens a new "Revert…" pull request. Click Create pull request, then Merge pull request, then Confirm merge.
5. Within a few minutes the live site returns to how it looked before that day's publish. Check, that it is fine now:
  - Go back to the Actions page and wait for the latest run to finish (🟡 → 🟢, usually one to three minutes).
  - Open the live BlastoDB site and do a "hard refresh" — Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac) — to be sure you're seeing the newest version.




---

# Prevention tip

Before making a large batch of changes (e.g. updating many datasets at once), it is a good idea to note the date and time. That makes it much easier to find the relevant commits in the history if something needs to be undone later.
