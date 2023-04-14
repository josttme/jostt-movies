import { LitElement, html, css, unsafeCSS } from 'lit'
import { registerImage } from '../utils/lazy-loading'
import movie from '../styles/components/movie.scss?inline'
export class MovieComponent extends LitElement {
  static get properties() {
    return {
      image: { type: String, attribute: true }
    }
  }
  /*   static styles = [
    css`
      :host {
        display: block;
        flex: 0 0 25%;
        z-index: 1;
      }
      img {
        aspect-ratio: 2/3;
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
      .skeleton-loading {
        background-color: #000019a9;
        animation: skeleton-loading 0.7s ease-in-out infinite alternate;
        z-index: 50;
      }
      @keyframes skeleton-loading {
        from {
          opacity: 0.5;
        }
        to {
          opacity: 1;
        }
      }
      @media (min-width: 1000px) {
        :host {
          flex: 0 0 calc(10% - 10px);
        }
      }
    `
  ] */
  static styles = [unsafeCSS(movie)]
  firstUpdated() {
    const img = this.shadowRoot.querySelector('img')
    registerImage(img)
  }
  render() {
    return html`
      <img
        class="skeleton-loading"
        src="https://res.cloudinary.com/josttme/image/upload/v1681269401/jostt.me/images/images/transparent_xz4qvr_zlokwp.webp"
        data-src=${`https://image.tmdb.org/t/p/w300/${this.image}`}
      />
    `
  }
}
customElements.define('movie-component', MovieComponent)
