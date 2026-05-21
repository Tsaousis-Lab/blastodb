# Sveltia CMS Setup

## 1. Create `index.html` and `config.yml` in /content/admin:
confic.yml:
```yml
backend:
  name: github
  repo: Tsaousis-Lab/blastodb
  branch: main # CMS always writes to main

media_folder: assets/uploads
public_folder: /assets/uploads

collections: #TODO: Define your own data structure here!
  # ─── Datasets ──────────────────────────────────────────────────────────────
  - name: datasets
    label: Datasets
    label_singular: Dataset
    folder: content/datasets
    create: true
    slug: "{{slug}}"
    extension: md
    format: frontmatter
    fields:
      - { name: title, label: Title, widget: string }

      - name: data_types
        label: Data Type(s)
        widget: select
        multiple: true
        options:
          - genome sequence
          - multi-omics
          - lab protocol
          - epidemiological
          - microbiome information

      - name: subtypes
        label: Subtype(s)
        widget: list
        hint: "e.g. ST1, ST3, ST7"

      - name: strains
        label: Strain(s)
        widget: list
        hint: "e.g. ATCC 50338"

      - name: source_url
        label: Link to Data Source
        widget: string
        hint: "Zenodo, NCBI, etc."

      - name: script_url
        label: Link to Evaluation Script
        widget: string
        required: false
        hint: "Optional — GitHub link, etc."

      - name: publication_ref
        label: Publication Reference ID
        widget: string
        hint: "Must match the ID of an entry in the Bibliography collection"

      - name: related_entries
        label: Related Entries
        widget: list
        required: false
        hint: "IDs of related datasets or protocols"

      - name: date
        label: Publication Date
        widget: datetime
        date_format: YYYY-MM-DD
        time_format: false

      - name: country
        label: Country / Geographical Origin
        widget: string
        required: false

      - name: body
        label: Description
        widget: markdown
        required: false
        hint: "Optional long-form description or protocol. Supports your custom BlastoDB markdown syntax."

  # ─── Bibliography ───────────────────────────────────────────────────────────
  - name: bibliography
    label: Bibliography
    label_singular: Publication
    folder: content/bibliography
    create: true
    slug: "{{fields.ref_id}}"
    extension: md
    format: frontmatter
    fields:
      - name: ref_id
        label: Reference ID / Citation Key
        widget: string
        hint: "Short unique ID, e.g. smith2023"

      - { name: title, label: Paper Title, widget: string }

      - name: authors
        label: Authors
        widget: list
        hint: "One author per line"

      - name: date
        label: Publication Date
        widget: datetime
        date_format: YYYY-MM-DD
        time_format: false

      - name: journal
        label: Journal / Conference Name
        widget: string

      - name: doi
        label: DOI
        widget: string
        required: false

      - name: url
        label: Link to Publication
        widget: string
        required: false

```

index.html:
```HTML
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Content Manager</title>
    </head>
    <body>
        <script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
    </body>
</html>
```

## 2. Add passthrough for eleventy config

Add this line to `.eleventy.js`, where the other `.addPassthroughCopy` elements are.
```js
eleventyConfig.addPassthroughCopy("content/admin"); //for the SveltiaCMS
```

### 3. Update package.json
Edit `package.json` in the root (`/`) directory:
```json
"scripts": {
  "build": "eleventy",
  "serve": "eleventy --serve",
  "watch": "eleventy --watch",
  "cms": "npx @sveltia/sveltia-cms" //<- add this line!
}
```


## 4. For Local Testing

### Install Sveltia CMS

```bash
npm install @sveltia/cms
```

### Create sveltia-cms.config.js
In the root directors:
```js
module.exports = {
  backend: {
    name: 'git-gateway',
    branch: 'main' // or your default branch
  },
  media_folder: 'images/uploads',
  public_folder: '/images/uploads',
  collections: [
    {
      name: 'pages',
      label: 'Pages',
      folder: 'content',
      create: true,
      fields: [
        { label: 'Title', name: 'title', widget: 'string' },
        { label: 'Body', name: 'body', widget: 'markdown' }
      ]
    }
    // Add more collections as needed
  ]
};
```
