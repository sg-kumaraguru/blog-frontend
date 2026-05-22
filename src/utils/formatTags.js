export const formatTags = (tags) => {

  // already array
  if (Array.isArray(tags)) {
    return tags
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  // string input
  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
};
