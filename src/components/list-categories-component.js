import { LitElement, html, css } from 'lit'
import { getCategories } from '../api/baseApi'
import { goTo } from '../router'

export class ListCategoriesComponent extends LitElement {
  static get properties() {
    return {
      categories: { type: Array }
    }
  }
  constructor() {
    super()
    this.categories = []
  }
  static styles = [
    css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      :host {
        display: block;
        width: 100%;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        overflow-x: scroll;
        padding: 0 0.3rem;
      }
      button {
        border: none;
        border-radius: 8px;
        background-color: #012c68;

        color: rgba(255, 255, 255, 0.8);
        font-size: 1.2rem;
        padding: 0.5rem 1rem;
        white-space: nowrap;
        border: 1px solid transparent;
      }
      :host::-webkit-scrollbar {
        display: none;
      }
      @media (min-width: 1000px) {
        :host {
          width: 85%;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
          margin: 0 auto;
        }
        button {
          cursor: pointer;
        }
        button:hover {
          background-color: #011a3d;
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
      }
    `
  ]
  async firstUpdated() {
    const { listCategories } = await getCategories()
    this.categories = listCategories
  }
  render() {
    return html`
      ${this.categories.map((category) => {
        return html`<button @click=${() => goTo(`/category=${category.id}-${category.name}`)}>
          ${category.name}
        </button>`
      })}
    `
  }
}
customElements.define('list-categories-component', ListCategoriesComponent)
