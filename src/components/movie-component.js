import { LitElement, html, css, unsafeCSS } from 'lit'
import { registerImage } from '../utils/lazy-loading'
import { goTo } from '../router'
import movie from '../styles/components/movie.scss?inline'
export class MovieComponent extends LitElement {
  static get properties() {
    return {
      image: { type: String, attribute: true },
      id: { type: Number, attribute: true }
    }
  }
  static styles = [unsafeCSS(movie)]
  firstUpdated() {
    const img = this.shadowRoot.querySelector('img')
    registerImage(img)
  }
  click = (e) => {
    goTo(`/movie=${e.target.getAttribute('id')}`)
  }
  render() {
    return html`
      <img
        class="skeleton-loading"
        src="https://res.cloudinary.com/josttme/image/upload/v1681269401/jostt.me/images/images/transparent_xz4qvr_zlokwp.webp"
        data-src=${`https://image.tmdb.org/t/p/w300/${this.image}`}
        id=${this.id}
        @click=${this.click}
      />
    `
  }
}

customElements.define('movie-component', MovieComponent)
