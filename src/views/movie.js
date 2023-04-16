import { LitElement, html, unsafeCSS } from 'lit'
import { getMovieById, getRelatedMoviesId } from '../api/baseApi'
import '../components/collection-component'
import moviePage from '../styles/components/movie-page.scss?inline'
export class Movie extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      posterImage: { type: String },
      backdropImage: { type: String },
      releaseDate: { type: String },
      description: { type: String },
      ratingAverage: { type: Number }
    }
  }

  static styles = [unsafeCSS(moviePage)]
  async firstUpdated() {
    const titleMovie = this.shadowRoot.querySelector('h1')
    const descriptionMovie = this.shadowRoot.querySelector('.description')
    const releaseYearMovie = this.shadowRoot.querySelector('.release-year')
    const backgroundImgMovie = this.shadowRoot.querySelector('.background-image')
    const posterImageMovie = this.shadowRoot.querySelector('.poster-image')
    const ratingAverageMovie = this.shadowRoot.querySelector('.rating')
    const relatedMovies = this.shadowRoot.querySelector('.related-movies')
    // get ID from URL
    const movieId = location.pathname.match(/\/movie=(\d+)/)[1]
    // get movie data from API
    const {
      movie: { title, posterImage, backdropImage, releaseDate, description, ratingAverage }
    } = await getMovieById(movieId)

    titleMovie.innerHTML = title
    descriptionMovie.innerHTML = description
    releaseYearMovie.innerHTML = ` (${releaseDate.split('-')[0]})`
    ratingAverageMovie.innerHTML = ratingAverage.toFixed(1)

    backgroundImgMovie.src = `https://image.tmdb.org/t/p/w1280/${backdropImage}`
    posterImageMovie.src = `https://image.tmdb.org/t/p/w500/${posterImage}`
    // get release movies
    const { moviesCategories } = await getRelatedMoviesId(movieId)
    const releaseMoviesList = ['Related movies', [...moviesCategories]]
    const collectionComponent = document.createElement('collection-component')
    collectionComponent.moviesCollection = releaseMoviesList

    relatedMovies.appendChild(collectionComponent)
  }

  render() {
    return html`
      <section class="container">
        <div class="backgrop-image">
          <img
            src="https://res.cloudinary.com/josttme/image/upload/v1681269401/jostt.me/images/images/transparent_xz4qvr_zlokwp.webp"
            class="background-image"
          />
          <div class="gradient"></div>
        </div>
        <div class="movie-info">
          <img
            src="https://res.cloudinary.com/josttme/image/upload/v1681269401/jostt.me/images/images/transparent_xz4qvr_zlokwp.webp"
            class="poster-image"
          />
          <div class="container-rating-watchlist">
            <div class="watchlist">
              <svg class="watchlist-add" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13 6a1 1 0 1 0-2 0v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5V6Z"
                />
              </svg>
              <svg
                class="watchlist-check hidden"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.707 7.293a1 1 0 0 1 0 1.414L11.414 16a2 2 0 0 1-2.828 0l-3.293-3.293a1 1 0 1 1 1.414-1.414L10 14.586l7.293-7.293a1 1 0 0 1 1.414 0z"
                />
              </svg>
            </div>
            <div class="rating-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 16 16"
              >
                <defs>
                  <linearGradient
                    xlink:href="#a"
                    id="b"
                    x1="-1483.4"
                    x2="-1155.8"
                    y1="1056.8"
                    y2="1056.8"
                    gradientUnits="userSpaceOnUse"
                  />
                  <linearGradient id="a">
                    <stop offset="0" stop-color="#fcd635" />
                    <stop offset="1" stop-color="#f7a928" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#b)"
                  d="M-1220 1212.4c-11.7 8.3-86.4-44.5-100.8-44.6-14.3-.1-90 51.4-101.4 43-11.6-8.6 15.5-96 11.2-109.7-4.3-13.6-76.7-69.6-72.2-83.2 4.5-13.6 96-14.9 107.7-23.2 11.7-8.3 42.6-94.5 56.9-94.4 14.3.1 43.8 86.8 55.3 95.3s103 11.3 107.3 25c4.4 13.6-69 68.4-73.5 82-4.5 13.6 21.2 101.4 9.5 109.8z"
                  transform="matrix(.04574 0 0 .04561 68.8 -40.3)"
                />
              </svg>

              <span class="rating"></span>
            </div>
          </div>
          <div class="container-title-year">
            <h1 class="title"></h1>
            <span class="release-year"> </span>
          </div>
          <p class="description"></p>
        </div>
      </section>
      <div class="related-movies"></div>
    `
  }
}
customElements.define('movie-page', Movie)
