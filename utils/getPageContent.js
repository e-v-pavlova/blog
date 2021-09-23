function dispatchError(error) {
  return error({ statusCode: 404, message: 'No articles found!' });
}

function getSkipNumber(currentPage, lastPage, totalArticles, perPage) {
  const modulo = totalArticles % perPage;
  const lastPageArticlesCount = modulo === 0 ? perPage : modulo;
  switch (currentPage) {
    case 1:
      return 0;
    case lastPage:
      return totalArticles - lastPageArticlesCount;
    default:
      return (currentPage - 1) * perPage;
  }
}

function mountCategories(allArticles, categories) {
  const namedCategories = categories.reduce((acc, category) => {
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
  const lowercaseNames = {};
  const mountedCategories = categoriesUsedInArticles.reduce((acc, category) => {
    const lowercaseName = category.toLowerCase();
    if (!acc[category]) {
      if (Object.prototype.hasOwnProperty.call(lowercaseNames, lowercaseName)) {
        acc[lowercaseNames[lowercaseName]].count += 1;
      } else if (namedCategories[lowercaseName] && namedCategories[lowercaseName].slug) {
        lowercaseNames[lowercaseName] = category;
        acc[category] = {
          name: category,
          count: 1,
          slug: namedCategories[lowercaseName].slug,
        };
      }
    } else {
      acc[category].count += 1;
    }
    return acc;
  }, {});
  return mountedCategories;
}

export default async ($content, currentPage = 1, error) => {
  const allArticles = await $content('articles').only(['categories']).fetch();
  const categories = await $content('categories').only(['slug', 'name']).fetch();
  const perPage = 5;
  const totalArticles = allArticles.length;
  const lastPage = Math.ceil(totalArticles / perPage);
  if (currentPage === 0 || Number.isNaN(currentPage) || currentPage > lastPage) {
    dispatchError(error);
  }
  const skipNumber = getSkipNumber(currentPage, lastPage, totalArticles, perPage);
  const paginatedArticles = await $content('articles')
    .only(['title', 'description', 'slug', 'createdAt'])
    .sortBy('createdAt', 'desc')
    .limit(perPage)
    .skip(skipNumber)
    .fetch();
  if (!paginatedArticles.length) {
    dispatchError(error);
  }
  const mountedCategories = mountCategories(allArticles, categories);
  return {
    lastPage,
    paginatedArticles,
    mountedCategories,
  };
};
