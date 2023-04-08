import { LitElement, html, css } from 'lit'
import { getTrendingMovies } from '../api/baseApi'
import { createCategorySlide } from '../utils/index'
import { goTo } from '../router'

export class Home extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ]
  async firstUpdated() {
    const link = this.renderRoot?.querySelector('button') ?? null
    const { movies } = await getTrendingMovies()
    console.log(movies)
    const getTrends = createCategorySlide(movies, 'Tendencias')
    link.addEventListener('click', (e) => {
      console.log(link)
      window.history.state === null && window.location.pathname !== '/mylist'
        ? goTo('/mylist')
        : window.history.back()
    })
  }
  render() {
    return html`<div>
      <button>mylist</button>
    </div>`
  }
}
customElements.define('home-page', Home)
