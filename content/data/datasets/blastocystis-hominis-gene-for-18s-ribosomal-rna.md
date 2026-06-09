---
layout: layouts/dataset-page.njk
title: Blastocystis hominis gene for 18S ribosomal RNA
publicaiton_date: "2002"
link_to_source: https://www.ncbi.nlm.nih.gov/nuccore/AB023499
strains:
  - HE87-1
datatypes:
  - 18s
data_origins: []
data_sources: []
detection_methods: []
subtypes:
  - Subtype 1
sources:
  - Human
related_publications:
  - arisue2002
lab_protocols:
  - Rigers Agar Slant
countries: []
---

Blastocystis hominis gene for 18S ribosomal RNA.
GenBank Access No.: AB023499

{% if related_publications.length %}

---

# References

[collector -> publications; clickable:false; card-template:references.njk; prefilter:[citation_key={{ related_publications | join(" OR citation_key=") }}]]

{% endif %}

{% if lab_protocols.length %}

---

# Related Lab Protocols

[collector -> lab_protocols; clickable:false; card-template:related_lab_protocol.njk; prefilter:[title={{ lab_protocols | join(" OR title=") }}]]

{% endif %}
