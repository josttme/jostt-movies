import { getCategoriesGeneric, getCategories } from '../api/baseApi'
export function getPathRoute(page) {
  let pageContent
  const path = window.location.pathname
  const [_, categoryId, nameCategory] = path.match(/category=(\d+)-(.+)/) || []
  const nameCategoryWithSpaces = decodeURIComponent(nameCategory.replace(/\+/g, ' '))

  if (path.startsWith('/category')) {
    return getGenericCategories(categoryId, page, nameCategoryWithSpaces)
  } else if (path.startsWith('/trends')) {
    pageContent
  } else if (path.startsWith('/search')) {
    pageContent
  } else {
    pageContent = html`<h1>Error 404: Página no encontrada</h1>`
  }
}

async function getGenericCategories(id, page, nameCategory) {
  const { genericCategories, totalPages } = await getCategoriesGeneric(id, page)
  return { genericCategories, totalPages, nameCategory }
}
