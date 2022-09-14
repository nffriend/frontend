const withFonts = require("next-fonts");
module.exports = withFonts({
  webpack(config) {
    return config;
  },
});
