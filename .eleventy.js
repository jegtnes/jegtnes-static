const ariaCurrent = require("./src/_shortcodes/aria-current");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addWatchTarget("src/_shortcodes");

  eleventyConfig.addShortcode("ariaCurrent", ariaCurrent);

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts",
    },
  };
};
