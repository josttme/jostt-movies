import { LitElement, html, css, unsafeCSS } from 'lit'
import './movie-component'
import collection from '../styles/components/collecion.scss?inline'
export class CollectionComponent extends LitElement {
  static get properties() {
    return {
      moviesCollection: { type: Array, attribute: true }
    }
  }
  constructor() {
    super()
    this.moviesCollection = []
    this.observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.target === this.slider.lastElementChild) {
            this.handleIntersection(entry, this.rightHandle)
          } else {
            this.handleIntersection(entry, this.leftHandle)
          }
        })
      },
      {
        root: null,
        rootMargin: '1000px 10px 1000px 10px',
        threshold: 1
      }
    )
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
          margin: 0 auto;
          /*  width: 85%; */
        }
        .movie-container {
          position: relative;

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
          width: 100%;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background-color: #000;
        }
        .movie-container movie-component.outside {
          opacity: 0.1; /* Reduce la opacidad de los elementos que están fuera del ancho del contenedor */
        }

        .prev-button,
        .next-button {
          background-color: #000;
          border: none;
          color: #000;
          font-size: 1.5rem;
        }
        .next-button {
          position: absolute;
          bottom: 0;
          opacity: 0.5;
          border-radius: 4px;
          height: 100%;
          z-index: 50;
          aspect-ratio: 2/3;
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
    `,
    unsafeCSS(collection),
    css`
      .container-slider {
        --slider-index: 0;
        transform: translateX(calc(var(--slider-index) * 100%));
      }
      .hidden {
        opacity: 0;
        cursor: default;
        pointer-events: none;
        z-index: -1;
      }

      .visible {
        opacity: 1;
        cursor: pointer;
        pointer-events: auto;
        z-index: 15;
      }
    `
  ]

  firstUpdated() {
    this.hiddenLeftHandle()
    this.hiddenRightHandle()
  }
  get leftHandle() {
    return this.renderRoot?.querySelector('.container-handle-left') ?? null
  }
  get rightHandle() {
    return this.renderRoot?.querySelector('.container-handle-right') ?? null
  }
  get slider() {
    return this.renderRoot?.querySelector('.container-slider') ?? null
  }
  hiddenLeftHandle() {
    this.observer.observe(this.slider.lastElementChild)
  }

  hiddenRightHandle() {
    this.observer.observe(this.slider.children[4] || this.slider.children[0])
  }
  handleIntersection(element, handle) {
    if (element.isIntersecting) {
      handle.classList.add('hidden')
      handle.classList.remove('visible')
    } else {
      handle.classList.remove('hidden')
      handle.classList.add('visible')
    }
  }

  leftClick(e) {
    const leftHandle = e.target
    const slider = leftHandle.closest('.container').querySelector('.container-slider')
    const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index'))
    slider.style.setProperty('--slider-index', sliderIndex + 1)
    this.hiddenLeftHandle, this.hiddenRightHandle
  }
  rightClick(e) {
    const righttHandle = e.target
    const slider = righttHandle.closest('.container').querySelector('.container-slider')
    const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index'))
    slider.style.setProperty('--slider-index', sliderIndex - 1)
    this.hiddenLeftHandle, this.hiddenRightHandle
  }

  render() {
    if (!this.moviesCollection[1].length) return
    const moviesToRender = this.moviesCollection.map((movie) => {
      return html`
        <movie-component class="movie" id=${movie.id} image=${movie.poster}></movie-component>
      `
    })

    return html`
      <div class="carousel-container">
        <h4>${this.moviesCollection[0]}</h4>
      </div>
      <div class="container">
        <button @click=${this.leftClick} class="container-handle container-handle-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24">
            <path
              d="M14 8.4 10.4 12l3.6 3.6a1 1 0 0 1-1.4 1.4l-4.3-4.3a1 1 0 0 1 0-1.4L12.6 7A1 1 0 1 1 14 8.4Z"
            />
          </svg>
        </button>
        <div class="container-slider ">
          ${this.moviesCollection.length <= 2
            ? this.moviesCollection[1].map((movie) => {
                return html`
                  <movie-component id=${movie.id} image=${movie.poster}></movie-component>
                `
              })
            : moviesToRender}
        </div>
        <button @click=${this.rightClick} class="container-handle container-handle-right">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24">
            <path
              d="m10 15.6 3.6-3.6L10 8.4l-.1-.1A1 1 0 0 1 11.4 7l4.3 4.3a1 1 0 0 1 0 1.4L11.4 17a1 1 0 1 1-1.4-1.4Z"
            />
          </svg>
        </button>
      </div>
    `
  }
}
customElements.define('collection-component', CollectionComponent)
