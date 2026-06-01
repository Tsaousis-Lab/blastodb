const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const configPath = path.join(__dirname, "content", "admin", "config.yml");

if (!fs.existsSync(configPath)) {
  throw new Error(
    `[Sveltia] Missing config.yml at ${configPath}. Please add it under content/admin/config.yml.`,
  );
}

const config = yaml.load(fs.readFileSync(configPath, "utf8"));

module.exports = config;
