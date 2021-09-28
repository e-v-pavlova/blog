function mountCategories(categoriesUsedInArticles, availableCategories) {
  const indexes = {};
  const mountedCategories = categoriesUsedInArticles.reduce((acc, category) => {
    const lowercaseName = category.toLowerCase();
    if (availableCategories[lowercaseName] && availableCategories[lowercaseName].slug) {
      if (!Object.prototype.hasOwnProperty.call(indexes, lowercaseName)) {
        indexes[lowercaseName] = acc.length;
        acc.push({
          name: category,
          count: 1,
          slug: availableCategories[lowercaseName].slug,
        });
      } else {
        acc[indexes[lowercaseName]].count += 1;
      }
    }
    return acc;
  }, []);
  return mountedCategories;
}

function sortCategories(categories) {
  return categories.sort((a, b) => (a.count > b.count ? 1 : -1));
}

function prepareCategories(allArticles, categories) {
  const availableCategories = categories.reduce((acc, category) => {
    if (category.name) {
      acc[category.name.toLowerCase()] = category;
    }
    return acc;
  }, {});
  const categoriesUsedInArticles = (allArticles.flatMap((article) => {
    if (article.categories) {
      return [...new Set(article.categories)];
    }
    return [];
  }));
  const mountedCategories = mountCategories(categoriesUsedInArticles, availableCategories);
  const sortedCategories = sortCategories(mountedCategories);
  return sortedCategories;
}

export default async ($content) => {
  const allArticles = await $content('articles').only(['categories']).fetch();
  const categories = await $content('categories').only(['slug', 'name']).fetch();
  return prepareCategories(allArticles, categories);
};
