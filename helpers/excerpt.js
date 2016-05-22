module.exports = function(content, charCount, ellipses = true) {
  if (!content) {
    console.error("You need to pass some content");
    return false;
  }

  if (!charCount) {
    console.error("You need to pass a character count to truncate at");
    return false;
  }

  // Cast content to string if it may be considered something else
  let excerpt = `${content}`;

  if (excerpt < charCount) {
    return excerpt;
  }

  excerpt = excerpt.substr(0, charCount);

  if (ellipses) {
    excerpt = excerpt + "…";
  }

  return excerpt;
}
