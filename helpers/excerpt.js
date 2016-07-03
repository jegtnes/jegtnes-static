module.exports = function(existingExcerpt, postContent, charCount, ellipses = true) {
  if (existingExcerpt) {
    return existingExcerpt;
  }

  if (!postContent) {
    console.error("You need to pass some content");
    return false;
  }

  if (!charCount) {
    console.error("You need to pass a character count to truncate at");
    return false;
  }

  // Cast content to string if it may be considered something else
  let excerpt = `${postContent}`;

  if (excerpt < charCount) {
    return excerpt;
  }

  excerpt = excerpt.substr(0, charCount);

  if (ellipses && excerpt.length > charCount) {
    excerpt = excerpt + "…";
  }

  return excerpt;
}
