import { LitElement, html, css } from 'lit'
import { getTrendingMovies } from '../api/baseApi'
import '../components/collection-component'
import { createCategorySlide } from '../utils/index'
import { goTo } from '../router'

export class Home extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    `
  ]
  async firstUpdated() {
    const link = this.renderRoot?.querySelector('button') ?? null
    const { movies } = await getTrendingMovies()
  }
  render() {
    return html`
      <collection-component></collection-component>
      <collection-component></collection-component>
      <collection-component></collection-component>
      <collection-component></collection-component>
      <collection-component></collection-component>
    `
  }
}
customElements.define('home-page', Home)
