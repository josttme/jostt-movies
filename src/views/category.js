import { LitElement, html, css } from 'lit'
import { getPathRoute } from '../utils/categoryRoutesConfig'
import { useObserver } from '../hooks/useObserver'
import '../components/movie-component'

export class Category extends LitElement {
  static properties = {
    page: { type: Number },
    listMovies: { type: Array }
  }
  constructor() {
    super()
    this.page = 1
    this.listMovies = []
    this.title = ''
    this.totalPages = 0
  }
  static styles = css`
    :host {
      display: block;
      margin: 0 auto !important;
    }
    div {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      margin-bottom: 1rem;
      padding: 0.4rem;
      gap: 0.2rem;
    }
    h4 {
      margin: 0.5rem;
      color: #fff;
      margin-left: 2%;
      font-size: 1.4rem;
      font-weight: bold;
    }
    @media screen and (min-width: 1000px) {
      :host {
        max-width: 1000px;
      }
      div {
        grid-template-columns: repeat(4, 1fr);
        padding: 0;
        gap: 1rem;
        margin: 0 auto;
      }

      h4 {
        margin-left: 1%;
      }
    }
  `
  async firstUpdated() {
    const { listMovies, totalPages, nameCategory } = await getPathRoute(this.page)
    if (listMovies.length === 0) {
      const title = this.shadowRoot.querySelector('h4')
      title.innerHTML = `Movie not found: "${nameCategory}"`
      return
    }
    this.listMovies = listMovies
    this.totalPages = totalPages
    this.title = nameCategory
  }
  async updated() {
    if (this.isUpdating) return
    this.isUpdating = true

    const container = this.shadowRoot.querySelector('div')
    const lastMovie = container.children[container.children.length - 5]
    if (!lastMovie) {
      this.isUpdating = false
      return
    }

    const options = {
      rootMargin: '0px 0px 200px 0px',
      threshold: 1.0
    }
    this.isIntersecting = await useObserver(lastMovie, options)

    this.page += 1
    if (this.page === this.totalPages) {
      this.isUpdating = false
      return
    }

    const { listMovies, totalPages, nameCategory } = await getPathRoute(this.page)
    this.listMovies = [...this.listMovies, ...listMovies]

    this.isUpdating = false
  }

  render() {
    return html`
      <h4>${this.title}</h4>
      <div>
        ${this.listMovies.map(
          (movie) => html`
            <movie-component image=${movie.poster} id=${movie.id}></movie-component>
          `
        )}
      </div>
    `
  }
}
customElements.define('category-page', Category)
