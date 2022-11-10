const ariaCurrent = require("./src/_shortcodes/aria-current");
const activeSection = require("./src/_shortcodes/active-section");

const { humanPostDate, isoPostDate } = require("./src/_filters/date");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addWatchTarget("src/_filters");
  eleventyConfig.addWatchTarget("src/_shortcodes");
  eleventyConfig.addWatchTarget("src/_styles");

  eleventyConfig.addShortcode("ariaCurrent", ariaCurrent);
  eleventyConfig.addShortcode("activeSection", activeSection);

  eleventyConfig.addFilter("humanPostDate", humanPostDate);
  eleventyConfig.addFilter("isoPostDate", isoPostDate);

  eleventyConfig.addFilter("log", function (value) {
    console.log(value);
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts",
    },
  };
};
