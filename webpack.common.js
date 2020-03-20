const path = require("path");

const resolve = {
  extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
  alias: {
    "@common": path.join(__dirname, "./src/common"),
    "@icons": path.join(__dirname, "./src/common/icons"),
    "@settings": path.join(__dirname, "./src/settings"),
    "@colors": path.join(__dirname, "./src/colors")
  }
};

module.exports = {
  resolve
};
