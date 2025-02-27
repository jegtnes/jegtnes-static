import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItPrism from "markdown-it-prism";

import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import rss from "@11ty/eleventy-plugin-rss";
import metagen from "eleventy-plugin-metagen";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";

import activeSection from "./src/_shortcodes/active-section.js";
import ariaCurrent from "./src/_shortcodes/aria-current.js";

import { humanPostDate, isoPostDate } from "./src/_filters/date.js";

export default function (eleventyConfig) {
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
  eleventyConfig.addPlugin(metagen);
  eleventyConfig.addPlugin(EleventyVitePlugin);

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		formats: ["avif", "webp", "jpeg"],

		// widths: ["350", "700", "1000", "auto"],
		widths: ["auto"],

		defaultAttributes: {
			loading: "lazy",
			decoding: "async"
		}
	});

  eleventyConfig.addPassthroughCopy({ "src/assets/public": "public" });
  eleventyConfig.addPassthroughCopy("src/assets");

  const mdLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  })
    .use(markdownItAnchor, {
      tabIndex: false,
    })
    .use(markdownItPrism, {
      defaultLanguage: "plain",
      highlightInlineCode: true,
    });

  eleventyConfig.setLibrary("md", mdLib);

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts",
    },
  };
};
