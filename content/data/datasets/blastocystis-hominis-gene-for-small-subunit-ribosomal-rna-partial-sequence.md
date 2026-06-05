---
layout: layouts/dataset-page.njk
title: Blastocystis hominis gene for small subunit ribosomal RNA, partial sequence
link_to_source: https://www.ncbi.nlm.nih.gov/nuccore/AB070989
strains:
  - HE87-1
datatypes:
  - 16S rRNA
data_origins: []
data_sources: []
detection_methods: []
subtypes:
  - Subtype 1
sources:
  - Mammal
related_publications:
  - arisue2003
lab_protocols:
  - Rigers Agar Slant
countries: []
---

Blastocystis hominis gene for small subunit ribosomal RNA, partial sequence.

==TODO: Which Datatype?==

{% if related_publications.length %}

---

## References

[collector -> publications; clickable:false; card-template:references.njk; prefilter:[citation_key={{ related_publications | join(" OR citation_key=") }}]]

{% endif %}

{% if lab_protocols.length %}

---

## Related Lab Protocols

[collector -> lab_protocols; clickable:false; card-template:related_lab_protocol.njk; prefilter:[title={{ lab_protocols | join(" OR title=") }}]]

{% endif %}
