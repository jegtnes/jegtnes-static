module.exports = function activeSection(itemUrl, pageUrl, output) {
  // The homepage will not have an active state in either case
  if (itemUrl === "/") return "";

  if (!pageUrl.startsWith(itemUrl)) return "";

  return output || "current";
};
