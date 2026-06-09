---
layout: layouts/lab-protocol.njk
title: Rigers Solution
related_publications: []
---

==TODO: Describe==

{% if related_publications.length %}

---

# References

[collector -> publications; clickable:false; card-template:references.njk; prefilter:[citation_key={{ related_publications | join(" OR citation_key=") }}]]

{% endif %}
