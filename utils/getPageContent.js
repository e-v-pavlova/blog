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

  return {
    currentPage,
    lastPage,
    paginatedArticles,
  };
};
