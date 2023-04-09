import { LitElement, html, css } from 'lit'

export class BillboardComponent extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        overflow: hidden;
      }
      .carousel-container {
        position: relative;
        margin: 0 auto;
        width: 85%;
        /*  max-width: 1200px; */
      }

      .movie-carousel {
        display: flex;
        width: 100%;
        background-color: transparent;
      }

      .movie-container {
        background-color: transparent;
        display: flex;
        flex-wrap: nowrap;
        width: 2000px;
        /*  overflow-x: scroll; */
        gap: 10px;
        transition: transform 0.3s ease-in-out;
      }
      .movie-container .movie {
        width: calc(15% - 20px); /* Anchura de cada imagen */
      }

      .carousel-buttons {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
      }

      .prev-button,
      .next-button {
        background-color: #fff;
        border: none;
        color: #000;
        font-size: 1.5rem;
        padding: 10px;
        cursor: pointer;
      }

      .prev-button {
        margin-right: 10px;
      }

      .prev-button[disabled],
      .next-button[disabled] {
        color: #ccc;
        cursor: not-allowed;
      }
    `
  ]

  render() {
    return html``
  }
}
customElements.define('billboard-component', BillboardComponent)
