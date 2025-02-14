export default function ariaCurrent(itemUrl, pageUrl) {
  if (itemUrl !== pageUrl) return "";

  return 'aria-current="page"';
};
