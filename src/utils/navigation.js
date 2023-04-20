const homeContainer = document.querySelector('#homeContainer')
const movieContainer = document.querySelector('#movieContainer')
const genericCategoryContainer = document.querySelector('#genericCategoryContainer')
import { goTo } from '../router'

/*
arrow.addEventListener('click', (e) => {
  e.preventDefault()
  window.history.state === null && window.location.pathname !== '/'
    ? goTo('/')
    : window.history.back()
})
titlePage.addEventListener('click', (e) => {
  goTo('/')
})
myListBtn.addEventListener('click', (e) => {
  goTo('mylist')
})
 */
export function homePage(result) {
  console.log('Home')
  homeContainer.childNodes.length === 0 ? (homeContainer.innerHTML = result) : null
  /*   const home = document.querySelector('Home-page')
  showOrHideSections('add', home)
 */
  showOrHideSections('add', homeContainer)
  showOrHideSections('remove', movieContainer)
  showOrHideSections('remove', genericCategoryContainer)
  /*
  showOrHideSections('remove', arrow) */
}
export function categoriesPage(result) {
  console.log('category')
  showOrHideSections('remove', homeContainer)
  showOrHideSections('remove', movieContainer)
  showOrHideSections('add', genericCategoryContainer)
  genericCategoryContainer.innerHTML = result
  /*   
  showOrHideSections('remove', homeContainer)
  showOrHideSections('remove', movieContainer)
  showOrHideSections('add', arrow) */
}
export function seacrhPage(result) {
  console.log('seacrh')
  /*   genericCategoryContainer.innerHTML = result
  showOrHideSections('remove', homeContainer)
  showOrHideSections('remove', genericCategoryContainer)
  showOrHideSections('remove', movieContainer)
  showOrHideSections('add', arrow) */
}
export function movie(result) {
  console.log('movie')
  /*   movieContainer.childNodes.length === 0 ? (movieContainer.innerHTML = result) : null */
  showOrHideSections('remove', homeContainer)
  showOrHideSections('add', movieContainer)
  showOrHideSections('remove', genericCategoryContainer)
  movieContainer.innerHTML = result
  /*  
  showOrHideSections('remove', homeContainer)
  showOrHideSections('add', arrow) */
}

export function myList(result) {
  console.log('myList')
  const app = document.querySelector('#app')
  app.innerHTML = result
  /*   movieContainer.innerHTML = result
  showOrHideSections('remove', homeContainer)
  showOrHideSections('remove', genericCategoryContainer)
  showOrHideSections('add', movieContainer)
  showOrHideSections('add', arrow) */
}
export function showOrHideSections(state, element) {
  state === 'add' ? element.classList.remove('hidden') : element.classList.add('hidden')
}
