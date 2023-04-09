import { LitElement, html, css } from 'lit'

export class BillboardComponent extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        position: relative;
        width: 100%;
        margin: 0 auto;
        background-color: #000019;
        color: #fff;
        overflow: hidden;
      }
      .img-container {
        width: 100%;
        height: 80vh;
        position: relative;
      }
      .img-container img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .logo-movie-container {
        position: absolute;
        height: 100%;
        width: 55vw;
        display: grid;
        place-content: center;
        z-index: 10;
      }

      .logo-movie-container img {
        width: 500px;
        opacity: 0;
        transform: translateX(-50px);
        animation: fadeInUp 1s ease forwards;
      }
      @keyframes fadeInUp {
        0% {
          opacity: 0;
          transform: translateX(-50px);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `
  ]
  render() {
    return html`
      <div class="logo-movie-container ">
        <img
          class="logo-movie"
          src="https://image.tmdb.org/t/p/w500/eEGfxToCPPP2ybJWgXYf2Fc2oP2.png"
        />
      </div>
      <div class="img-container">
        <img style="width: 100vw" src="/avatar (1).jpg" />
      </div>
    `
  }
}
customElements.define('billboard-component', BillboardComponent)
