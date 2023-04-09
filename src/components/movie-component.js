import { LitElement, html, css } from 'lit'

export class MovieComponent extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        flex: 0 0 calc(10% - 10px);
        z-index: 1;
      }
      img {
        aspect-ratio: 2/3;
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
    `
  ]

  render() {
    return html` <img src="https://image.tmdb.org/t/p/w300/1Y8Khr8lyBw6Tatxlmkqs0UUOWw.jpg" /> `
  }
}
customElements.define('movie-component', MovieComponent)
