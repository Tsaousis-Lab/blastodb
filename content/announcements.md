---
layout: layouts/default-page.njk
title: Announcements
description: Announcements for BlastoDB.
feed_url: /announcements/feed.xml
---

[hero: text-align:center]

<h-hero>Announcements</h-hero>

Here you find a list of all current and mostly past announcements from BlastoDB.

<a class="btn feed-btn" href="/announcements/feed.xml" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>RSS</a>
[:hero]

[collector -> announcements; arrange:rows card-template:announcement; clickable:false; search:[title,date]]
