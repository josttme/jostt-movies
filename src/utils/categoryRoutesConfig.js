import { getCategoriesGeneric, getMoviesBySearch, getTrendingMovies } from '../api/baseApi'
export function getPathRoute(page) {
  const path = window.location.pathname
  if (path.match('/category=trends')) {
    return getMoviesTrending(page)
  } else if (path.startsWith('/category')) {
    const [_, categoryId, nameCategory] = path.match(/category=(\d+)-(.+)/) || []
    const nameCategoryWithSpaces = decodeURIComponent(nameCategory.replace(/\+/g, ' '))
    return getGenericCategories(categoryId, page, nameCategoryWithSpaces)
  } else if (path.startsWith('/search')) {
    const query = path.split('=')[1]
    return getSearchMovies(query, page)
  }
}

async function getGenericCategories(id, page, nameCategory) {
  const { genericCategories: listMovies, totalPages } = await getCategoriesGeneric(id, page)
  return { listMovies, totalPages, nameCategory }
}

async function getSearchMovies(query, page) {
  const { movies: listMovies, totalPages } = await getMoviesBySearch(query, page)
  return { listMovies, totalPages, nameCategory: query }
}
async function getMoviesTrending(page) {
  const nameCategory = 'Trends'
  const { movies: listMovies, totalPages } = await getTrendingMovies(page)
  return { listMovies, totalPages, nameCategory }
}
