import { getCategories, getMoviesByCategory } from '../api/baseApi'
export async function divideArray() {
  const { listCategories } = await getCategories()
  let size = 4
  const result = []
  for (let i = 0; i < listCategories.length; i += size) {
    result.push(listCategories.slice(i, i + size))
  }
  return result
}
const showPage = (arr, page, pageSize) => {
  const startIndex = page * pageSize
  const endIndex = startIndex + pageSize
  for (let i = startIndex; i < endIndex && i < arr.length; i++) {
    return arr[i]
  }
}

export async function getCategoriesById(listCategories, page, pageSize) {
  let partsOfCategoryList = showPage(listCategories, page, pageSize)
  const moviesCategoriesPage = []
  for (const category of partsOfCategoryList) {
    const { moviesCategories } = await getMoviesByCategory(category.id)
    moviesCategoriesPage.push([category.name, moviesCategories])
  }
  return Promise.all(moviesCategoriesPage)
}
