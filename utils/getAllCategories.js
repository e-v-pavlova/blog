function countCategoriesUsedInArticles(allArticles) {
  return allArticles.reduce((acc, article) => {
    if (article.categories) {
      article.categories.forEach((category) => {
        acc[category.toLowerCase()] = (acc[category.toLowerCase()] || 0) + 1;
      });
    }
    return acc;
  }, {});
}

function mountCategories(availableCategories, categoriesUsedInArticles) {
  return availableCategories
    .filter((category) => (
      Object.prototype.hasOwnProperty.call(categoriesUsedInArticles, category.name.toLowerCase())
    )).map((category) => {
      const mountedCategory = { ...category };
      mountedCategory.count = categoriesUsedInArticles[category.name.toLowerCase()];
      return mountedCategory;
    });
}

function sortCategories(categories) {
  return categories.sort((a, b) => (a.count < b.count ? 1 : -1));
}

export default (allArticles, availableCategories) => {
  const categoriesUsedInArticles = countCategoriesUsedInArticles(allArticles);
  const mountedCategories = mountCategories(availableCategories, categoriesUsedInArticles);
  return sortCategories(mountedCategories);
};
