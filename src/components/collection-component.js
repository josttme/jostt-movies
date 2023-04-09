import { LitElement, html, unsafeCSS, css } from 'lit'
import './movie-component'
import collection from '../styles/components/collecion.scss?inline'

export class CollectionComponent extends LitElement {
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
      /* .movie-container::-webkit-scrollbar {
        display: none;
      } */

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

  firstUpdated() {
    const movieContainer = this.shadowRoot?.querySelector('.movie-container') ?? null
    const nextButton = this.shadowRoot?.querySelector('.next-button') ?? null
    const prevButton = this.shadowRoot?.querySelector('.prev-button') ?? null

    const containerWidth = movieContainer.offsetWidth
    console.log(containerWidth)

    prevButton.disabled = true
    prevButton.style.display = 'none'

    function toggleButtons(btn1, btn2) {
      ;[btn1, btn2].forEach((btn) => {
        btn.disabled = !btn.disabled
        btn.style.display = btn.disabled ? 'none' : 'block'
      })
    }

    prevButton.addEventListener('click', () => {
      movieContainer.style.transform = `translateX(0px)`
      toggleButtons(prevButton, nextButton)
    })

    nextButton.addEventListener('click', () => {
      movieContainer.style.transform = `translateX(-${containerWidth}px)`
      toggleButtons(nextButton, prevButton)
    })
  }

  render() {
    return html`
      <div class="carousel-container">
        <h4>Titulo</h4>
        <div class="movie-carousel">
          <div class="movie-container">
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
            <movie-component class="movie"></movie-component>
          </div>
        </div>
        <div class="carousel-buttons">
          <button class="prev-button" disabled>&lt;</button>
          <button class="next-button">&gt;</button>
        </div>
      </div>
    `
  }
}
customElements.define('collection-component', CollectionComponent)
