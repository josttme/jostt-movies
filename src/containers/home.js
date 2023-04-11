import { LitElement, html, css } from 'lit'
import { getTrendingMovies } from '../api/baseApi'
import '../components/collection-component'
import '../components/billboard-component'
import '../components/list-categories-component'
import '../components/search-component'
import { getCategoriesById, divideArray } from '../utils/index'
import resultsTrends from '../mocks/result-trends.json'
import { goTo } from '../router'

export class Home extends LitElement {
  static get properties() {
    return {
      dataReady: { type: Boolean }
    }
  }
  constructor() {
    super()
    this.trends = []
    this.listCategories = []
    this.moviesCategories = []
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
    this.listCategories = await divideArray()
    this.moviesCategories = await getCategoriesById(
      this.listCategories,
      this.currentPage,
      this.pageSize
    )
    this.collectionCategories = [movies, ...this.moviesCategories]
    this.dataReady = true
  }

  render() {
    return html`
      <search-component></search-component>
      <billboard-component></billboard-component>
      <list-categories-component></list-categories-component>
      ${this.dataReady
        ? this.collectionCategories.map(
            (category) =>
              html`<collection-component .moviesCollection=${category}></collection-component>`
          )
        : html`<p>Loading...</p>`}
    `
  }
}
customElements.define('home-page', Home)
