export default function activeSection(itemUrl, pageUrl, output) {
  if(!itemUrl || !pageUrl) return "";

  // The homepage will not have an active state in either case
  if (itemUrl === "/") return "";

  if (!pageUrl.startsWith(itemUrl)) return "";

  return output || "current";
};
