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

export default async ($content, currentPage = 1, error) => {
  const allArticles = await $content('articles').only(['categories']).fetch();
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
  return {
    lastPage,
    paginatedArticles,
  };
};
