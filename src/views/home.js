import { LitElement, html, css } from 'lit'
import { getTrendingMovies } from '../api/baseApi'
import { useObserver } from '../hooks/useObserver'
import { getCategoriesById, divideArray } from '../utils/index'
import '../components/collection-component'
import '../components/billboard-component'
import '../components/list-categories-component'
import '../components/search-component'

export class Home extends LitElement {
  static get properties() {
    return {
      dataReady: { type: Boolean },
      collectionCategories: { type: Array }
    }
  }
  constructor() {
    super()
    this.pageSize = 1
    this.currentPage = 0
    this.collectionCategories = []
    this.dataReady = false
  }
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        overflow: hidden;
        position: relative;
        min-height: 110vh;
      }
      search-component {
        position: absolute;
        top: 0;
        width: 100%;
      }
    `
  ]
  async firstUpdated() {
    const { movies } = await getTrendingMovies()
    const trendsMovies = ['Trends', [...movies]]
    const moviesCategories = await this.categoriesCollection(this.currentPage, this.pageSize)
    this.collectionCategories = [trendsMovies, ...moviesCategories]
    this.dataReady = true
  }
  async categoriesCollection(currentPage, pageSize) {
    const listCategories = await divideArray()
    let moviesCategories = await getCategoriesById(listCategories, currentPage, pageSize)
    return moviesCategories
  }

  async updated() {
    const collectionContainer = this.shadowRoot.querySelector('.collection-container')
    const lastCollection = collectionContainer.lastElementChild
    if (!lastCollection) return
    const options = { rootMargin: '0px' }
    const isIntersecting = await useObserver(lastCollection, options)
    this.currentPage++
    if (this.currentPage === 5) return
    const moviesCategories = await this.categoriesCollection(this.currentPage, this.pageSize)
    this.dataReady = true
    this.collectionCategories = [...this.collectionCategories, ...moviesCategories]
  }
  render() {
    return html`
      <billboard-component></billboard-component>
      <list-categories-component></list-categories-component>
      <section class="collection-container">
        ${this.dataReady
          ? this.collectionCategories.map(
              (category) =>
                html`<collection-component
                  .moviesCollection=${category}
                ></collection-component>`
            )
          : html`<span>Cargando...</span>`}
      </section>
    `
  }
}
customElements.define('home-page', Home)
