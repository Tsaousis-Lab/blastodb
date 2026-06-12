---
layout: layouts/documentation.njk
title: GitHub Setup
description: How to create a GitHub account, get access to the BlastoDB repository, and generate a personal access token.
---

[hero: text-align:center]

<h-hero>GitHub Setup<h-hero>

[:hero]

You need the following three things, to edit the content of BlastoDB:

1. [Create a GitHub account](/git-setup/#Step1)
2. [Request access to the BlastoDB repository](asd.de)
3. [Generate a personal access token](asd.de)
4. [Log In](asd.de)

---

## Step 1: Create a GitHub account

Go to [github.com](https://github.com), click **Sign up**, and create an account.

---

## Step 2: Request access to the repository

The BlastoDB repository is part of the organization "Tasousis Lab". You need to be added as a member of this lab before you can make changes to the BlastoDB website.

[Contact Tasos](mailto:A.Tsaousis@kent.ac.uk) and send him your username. He will add you to `Tsaousis-Lab` and give you access to the repository. Once you have access, you can log into the CMS. For this, you need a personal access token (PAT).

---

## Step 3: Generate a personal access token

The CMS requires a personal access token to authenticate on your behalf. This is a long password that you generate once and use to log in.

1. Go to <a href="https://github.com/settings/tokens" target="_blank">https://github.com/settings/tokens</a>. This opens the Page where you can create a PAT.
    - Or navigate there manually:
      - Click your **profile picture** in the top-right corner and choose **Settings**
      - Scroll down in the left sidebar and click **Developer settings**
      - Click **Personal access tokens** → **Tokens (classic)**
2. Click **Generate new token** → **Generate new token (classic)**
3. Give it a descriptive name, e.g. `BlastoDB`
4. Set the **Expiration** — choose **No expiration** or set a date far in the future
5. Under **Select scopes**, tick **`repo`** (this grants access to read and write repository content)
6. Scroll down and click **Generate token**
7. **Copy the token immediately** — GitHub will only show it once.
8. **Paste it into a password manager**, never store it as plain text!

<div class="guide-warning">

#### Security Consideration

It is **really important** that you keep this password private. Please store it in the password manager of your choice, and never in a unencypted file on your computer.

**If you loose your PAT**, delete it immediately (<a href="https://github.com/settings/tokens" target="_blank">https://github.com/settings/tokens</a>). You can always create a new one.

</div>




---

## Step 4: Logging in

Once you have your token, go to [www.blastodb/admin](/admin/) and follow the steps on the [Logging into the CMS](/documentation/editors_guide/getting-started/) page.
