
const fs = require("fs");
const path = require("path");

const manifestPath = path.resolve(path.dirname(__dirname), "src", "manifest.json");

fs.readFile(manifestPath, "utf-8",
  (err, data) =>
  {
    const manifest = JSON.parse(data);

    if( !err ) {
      console.log(manifest.version);
    }
  });