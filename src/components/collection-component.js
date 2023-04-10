import { LitElement, html, unsafeCSS, css } from 'lit'
import './movie-component'
import collection from '../styles/components/collecion.scss?inline'

export class CollectionComponent extends LitElement {
  static get properties() {
    return {}
  }
  constructor() {
    super()
    this.trends
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
        font-family: -apple-system, BlinkMacSystemFont, segoe ui, Roboto, Helvetica, Arial,
          sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol;
        color: rgba(255, 255, 255, 0.8);
        overflow: hidden;
      }
      h4 {
        font-size: 1.5rem;
        margin-left: 0.3rem;
      }
      .carousel-container {
        width: 100%;
      }

      .movie-carousel {
        display: flex;
        width: 100%;
      }

      .movie-container {
        display: flex;
        overflow-x: scroll;
        gap: 0.3rem;
        padding: 0.3rem;
        transition: transform 0.3s ease-in-out;
      }
      .movie-container::-webkit-scrollbar {
        display: none;
      }

      .carousel-buttons {
        display: none;
      }
      @media (min-width: 1000px) {
        .carousel-container {
          position: relative;
          margin: 0 auto;
          width: 85%;
        }
        .movie-container {
          background-color: transparent;
          display: flex;
          flex-wrap: nowrap;
          width: 2000px;
          overflow-x: visible;
          gap: 10px;
          transition: transform 0.3s ease-in-out;
        }
        .movie-container .movie {
          width: calc(15% - 20px); /* Anchura de cada imagen */
        }
        .carousel-buttons {
          display: block;
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
      }
    `
  ]

  firstUpdated() {
    const movieContainer = this.shadowRoot?.querySelector('.movie-container') ?? null
    const nextButton = this.shadowRoot?.querySelector('.next-button') ?? null
    const prevButton = this.shadowRoot?.querySelector('.prev-button') ?? null

    const containerWidth = movieContainer.offsetWidth

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
            ${this.trends.map((trend) => {
              return html`
                <movie-component class="movie" image=${trend.poster_path}></movie-component>
              `
            })}
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
