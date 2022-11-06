const ariaCurrent = require("./src/_shortcodes/aria-current");
const activeSection = require("./src/_shortcodes/active-section");

const humanPostDate = require("./src/_filters/date");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addWatchTarget("src/_shortcodes");
  eleventyConfig.addWatchTarget("src/_filters");

  eleventyConfig.addShortcode("ariaCurrent", ariaCurrent);
  eleventyConfig.addShortcode("activeSection", activeSection);

  eleventyConfig.addFilter("humanPostDate", humanPostDate);

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts",
    },
  };
};
