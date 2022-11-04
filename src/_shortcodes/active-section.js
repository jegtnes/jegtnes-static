module.exports = function activeSection(itemUrl, pageUrl) {
  // The homepage will not have an active state in either case
  if (itemUrl === "/") return "";

  if (!pageUrl.startsWith(itemUrl)) return "";

  return 'class="current"';
};
