export default async ($content, currentPage = 1, error) => {
  const perPage = 5;
  const allArticles = await $content('articles').fetch();
  const totalArticles = allArticles.length;
  const lastPage = Math.ceil(totalArticles / perPage);

  if (currentPage === 0
    || Number.isNaN(currentPage)
    || currentPage > lastPage
  ) {
    return error({ statusCode: 404, message: 'No articles found!' });
  }

  const modulo = totalArticles % perPage;
  const lastPageArticlesCount = modulo === 0 ? perPage : modulo;

  let skipNumber;
  switch (currentPage) {
    case 1:
      skipNumber = 0;
      break;
    case lastPage:
      skipNumber = totalArticles - lastPageArticlesCount;
      break;
    default:
      skipNumber = (currentPage - 1) * perPage;
  }

  const paginatedArticles = await $content('articles')
    .only(['title', 'description', 'slug', 'createdAt'])
    .sortBy('createdAt', 'desc')
    .limit(perPage)
    .skip(skipNumber)
    .fetch();

  if (!paginatedArticles.length) {
    return error({ statusCode: 404, message: 'No articles found!' });
  }

  const categories = await $content('categories')
    .only(['slug', 'name'])
    .fetch();

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

  return {
    currentPage,
    lastPage,
    paginatedArticles,
    mountedCategories,
  };
};
