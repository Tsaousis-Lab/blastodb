module.exports = {
  backend: {
    name: "git-gateway",
    branch: "main", // or your default branch
  },
  media_folder: "images/uploads",
  public_folder: "/images/uploads",
  collections: [
    {
      name: "pages",
      label: "Pages",
      folder: "content",
      create: true,
      fields: [
        { label: "Title", name: "title", widget: "string" },
        { label: "Body", name: "body", widget: "markdown" },
      ],
    },
    // Add more collections as needed
  ],
};
