import appConstants from '../common/constants'
import Route from 'route-parser'
import { homePage, categoriesPage, movie, myList } from '../utils/navigation.js'
import HomePage from '../pages/home.template'
import CategoryPage from '../pages/category.template'
import MoviePage from '../pages/movie.template'
import MyListPage from '../pages/my-list.template'

export const routes = {
  Home: new Route(appConstants.routes.index),
  Category: new Route(appConstants.routes.category),
  Search: new Route(appConstants.routes.search),
  Movie: new Route(appConstants.routes.movie),
  MyList: new Route(appConstants.routes.myList)
}

export const render = (path) => {
  path.startsWith(routes.Category.spec) || path.startsWith(routes.Search.spec)
    ? categoriesPage(CategoryPage())
    : path.startsWith(routes.Movie.spec)
    ? movie(MoviePage())
    : path.startsWith(routes.MyList.spec)
    ? myList(MyListPage())
    : homePage(HomePage())
}

export const goTo = (path) => {
  if (location.pathname !== path) {
    window.history.pushState({ path }, path, path)
    render(path)
  } else {
    window.history.replaceState({ path }, path, path)
  }
}

export const getRouterParams = () => {
  const url = new URL(window.location.href).pathname
  return getPathRoute(url)
}

const initRouter = () => {
  window.addEventListener('popstate', (e) => {
    render(new URL(window.location.href).pathname)
  })
  document.querySelectorAll('[href^="/"]').forEach((el) => {
    el.addEventListener('click', (env) => {
      env.preventDefault()
      const { pathname: path } = new URL(env.target.href)
      goTo(path)
    })
  })
  render(new URL(window.location.href).pathname)
}

export default initRouter
