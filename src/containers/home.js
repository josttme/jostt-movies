import { LitElement, html, css } from 'lit'
import { getTrendingMovies } from '../api/baseApi'
import '../components/collection-component'
import '../components/billboard-component'
import '../components/list-categories-component'
import resultsTrends from '../mocks/result-trends.json'
import { createCategorySlide } from '../utils/index'
import { goTo } from '../router'

export class Home extends LitElement {
  constructor() {
    super()
    this.trends = resultsTrends.results
  }
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        overflow: hidden;
      }
    `
  ]
  firstUpdated() {
    const collection = this.shadowRoot.querySelector('collection-component')
    collection.trends = this.trends
  }
  render() {
    return html`
      <billboard-component></billboard-component>
      <list-categories-component></list-categories-component>
      <collection-component></collection-component>
    `
  }
}
customElements.define('home-page', Home)
