const rss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const metagen = require("eleventy-plugin-metagen");

const activeSection = require("./src/_shortcodes/active-section");
const ariaCurrent = require("./src/_shortcodes/aria-current");

const { humanPostDate, isoPostDate } = require("./src/_filters/date");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addWatchTarget("src/_filters");
  eleventyConfig.addWatchTarget("src/_shortcodes");
  eleventyConfig.addWatchTarget("src/_styles");

  eleventyConfig.addShortcode("activeSection", activeSection);
  eleventyConfig.addShortcode("ariaCurrent", ariaCurrent);

  eleventyConfig.addFilter("humanPostDate", humanPostDate);
  eleventyConfig.addFilter("isoPostDate", isoPostDate);

  eleventyConfig.addFilter("log", function (value) {
    console.log(value);
  });

  eleventyConfig.addPlugin(rss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(metagen);

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts",
    },
  };
};
