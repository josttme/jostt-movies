import { LitElement, html, css } from 'lit'

export class MovieComponent extends LitElement {
  static get properties() {
    return {
      image: { type: String, attribute: true }
    }
  }
  static styles = [
    css`
      :host {
        display: block;
        flex: 0 0 7.5rem;
        z-index: 1;
      }
      img {
        aspect-ratio: 2/3;
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
      @media (min-width: 1000px) {
        :host {
          flex: 0 0 calc(10% - 10px);
        }
      }
    `
  ]

  render() {
    return html` <img src=${`https://image.tmdb.org/t/p/w300/${this.image}`} /> `
  }
}
customElements.define('movie-component', MovieComponent)
