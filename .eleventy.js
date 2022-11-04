const ariaCurrent = require("./src/_shortcodes/aria-current");
const activeSection = require("./src/_shortcodes/active-section");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addWatchTarget("src/_shortcodes");

  eleventyConfig.addShortcode("ariaCurrent", ariaCurrent);
  eleventyConfig.addShortcode("activeSection", activeSection);

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts",
    },
  };
};
