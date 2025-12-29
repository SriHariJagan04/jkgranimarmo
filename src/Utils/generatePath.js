export const generatePath = (category, subcategory = null, child = null) => {
  let path = `/${category.toLowerCase().replace(/\s+/g, "")}`;
  if (subcategory) {
    path += `/${subcategory.toLowerCase().replace(/\s+/g, "")}`;
  }
  if (child) {
    path += `-${child.toLowerCase().replace(/\s+/g, "")}`;
  }
  return path;
};

