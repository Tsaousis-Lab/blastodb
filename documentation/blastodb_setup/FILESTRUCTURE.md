
# File Structure of the BlastoDB Repository


content/
  admin/
    index.html       ← CMS editor UI
    config.yml       ← your schema (edit this as your data evolves)
  datasets/
    smith2023-st3.md         ← created by CMS editors
    jones2024-microbiome.md
  bibliography/
    smith2023.md
    jones2024.md
  ...rest of your existing content...


  ```
blastodb/
├── content/                    ← Contains all the content (Pages, Data, CMS)
│   ├── admin/                      ← Contains CMS Info
│   │   └── index.html              ← CMS editor UI
│   │   └── config.yml              ← Data and Page schema (edit this as your data evolves)
│   ├── datasets/                   ← Contains all datasets
│   │   └── jones2024-microbiome.md ← created by CMS editors
│   │   └── ...
│   ├── bibliography/               ← Contains all references added through CMS
│   │    └── smith2023.md            ← created by CMS editors
│   │    └── ...
│   ├── index.md                    ← Webpages
│   ├── about.md
│   ├── subtypes.md
│   └── ...
├── _includes/
│   └── layouts/                    ← 11ty layouts for the content
│       └── base.njk            ← Main HTML template (don't edit usually)
├── assets/
│   ├── style.css               ← Website styling
│   └── main.js                 ← Mobile navigation script
├── lib/
│   └── parser.js               ← Custom markdown parser (do not edit)
├── .eleventy.js                ← 11ty configuration and custom components (do not edit usually)
├── nav.json                    ← Navigation menu configuration
└── output/                     ← Generated website (do not edit)
    ├── index.html
    ├── about.html
    └── ...
```


## CMS

TODO: where is the CMS defined?

## Pages

TODO: where are the pages defined
