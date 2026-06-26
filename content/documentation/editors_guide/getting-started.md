---
layout: layouts/documentation.njk
title: Logging into the CMS
description: How to log into the BlastoDB CMS and navigate the editorial interface.
---

[hero: text-align:center]

<h-hero>Logging into the CMS<h-hero>

[:hero]

# Opening the CMS

The content management system (CMS) can be accessed with this link: <a href="/admin" target="_blank">www.blastodb.com/admin</a>

You will need a GitHub Account, access rights to the Resository and a Personal Access Tocen (PAT) to log in. Go to [GitHub Setup](/documentation/editors_guide/github-setup/) if you need help with that.

# Logging in

1. Click **Sing In Using Access Token** (**[-> You need to generate a PAT](/documentation/editors_guide/github-setup#Step3)** if you don't already have one)
2. Paste the PAT you generated during setup from your favorite password manager into the text field.
3. You are now in the CMS dashboard!

# First Task: Add Yourself to the Acknowledgements

To get a feeling for how editing works, your first task will be to add yourself to the people that contribute to BlastoDB. You can do that by adding your information by clicking (on the left sidebar) `Community` -> `People`. Then, if you want, you can add your information by scrolling down and clicking `Add Person` (this is easyer if you click `collapse all` first). The information you add will be publically available, consider this before adding a picture or an email. Cou can find more information on the [editors guide for people]((/documentation/editors_guide/people/)).

If you have more questions about the editorial workflow, continue reading the following section. It is a good idea to look at the description of each collection so you know which data to add, and where to be careful when editing.

# The editorial workflow

The left sidebar in the dashboard lists all the content you can edit. This includes the content of the database, and the webpage itself.

The content of the database includes:
- [**Datasets**](/documentation/editors_guide/datasets/) — individual sequencing datasets
- [**Publications**](/documentation/editors_guide/publications/) — the publication library
- [**Research Labs**](/documentation/editors_guide/labs/) — lab profiles
- [**Lab Protocols**](/documentation/editors_guide/lab_protocols/) — laboratory protocols
- [**Subtypes**](/documentation/editors_guide/subtypes/) — Blastocystis subtype pages
- [**Vocabularies**](/documentation/editors_guide/vocabularies/) — controlled lists (datatypes, countries, sources, etc.)

The webpage can be edited here:
- [**Pages**](/documentation/editors_guide/pages/) — the web-pages of BlastoDB
- [**Navigation**](/documentation/editors_guide/navigation/) — header and footer of BlastoDB

Your changes will not go live immediately. BlastoDB is build once a day at 5:30 UTC. You can also manually start the bild process as described below.

In case you accidentaly break something, you can always [roll back a change](/documentation/editors_guide/rollback/). (It is a hassle though, try to avoid it.)

# Manually Publishing BlastoDB {#manually-building-blastodb}

BlastoDB is build using GitHub Actions. The build is triggered automatically once per day at 5:30 UTC. If you want to manually override that:

1. Open the GitHub Actions Page of BlastoDB ([https://github.com/Tsaousis-Lab/blastodb/actions](https://github.com/Tsaousis-Lab/blastodb/actions))
2. Click **Publish** on the menu on the right side.
3. You will see a new workflow start, which might take one to three minutes.
  - If the circle is yellow, the workflow is running, wait till it finishes
  - If the circle is green, the workflow run was successfull. You can now check your changes on the life website.
  - If the circle is red, the workflow has failed. Check for any errors in the code. If you made a mistake, you need to [roll back the change](/documentation/editors_guide/rollback/).
