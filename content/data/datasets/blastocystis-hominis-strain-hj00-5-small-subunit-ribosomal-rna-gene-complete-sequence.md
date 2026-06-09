---
layout: layouts/dataset-page.njk
title: Blastocystis hominis strain HJ00-5 small subunit ribosomal RNA gene, complete sequence
link_to_source: https://www.ncbi.nlm.nih.gov/nuccore/AF408426
strains:
  - HJ00-4
datatypes:
  - Shotgun
data_origins: []
data_sources: []
detection_methods: []
subtypes:
  - Subtype 9
sources: []
related_publications:
  - yoshikawa2004
lab_protocols: []
countries: []
---

GenBank Access No.:AF408426

{% if related_publications.length %}

---

# References

[collector -> publications; clickable:false; card-template:references.njk; prefilter:[citation_key={{ related_publications | join(" OR citation_key=") }}]]

{% endif %}

{% if lab_protocols.length %}

---

# Lab Protocols

[collector -> lab_protocols; clickable:false; card-template:related_lab_protocol.njk; prefilter:[title={{ lab_protocols | join(" OR title=") }}]]

{% endif %}
