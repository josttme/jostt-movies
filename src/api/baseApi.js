import axios from 'axios'
import { API_KEY } from './secret'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  params: { api_key: API_KEY, language: 'en-US' }
})

export async function getTrendingMovies(page) {
  const res = await api('trending/movie/day', {
    params: { page }
  })
  const movies = res.data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path
  }))
  const totalPages = res.data.total_pages
  return { movies, totalPages }
}

export async function getCategories() {
  const res = await api('genre/movie/list')
  const listCategories = res.data.genres.map((category) => ({
    id: category.id,
    name: category.name
  }))
  return { listCategories }
}

// prettier-ignore
export async function getMoviesByCategory(id) {
	const res = await api('discover/movie', {
		params: { with_genres: id},
	})
  const moviesCategories = res.data.results.map((category) => ({
    id: category.id,
    title: category.title,
    poster: category.poster_path
  }))
	return {moviesCategories}
}

export async function getMovieById(id) {
  const res = await api(`movie/${id}`)
  const movie = {
    idMovie: res.data.id,
    title: res.data.title,
    posterImage: res.data.poster_path,
    backdropImage: res.data.backdrop_path,
    releaseDate: res.data.release_date,
    description: res.data.overview,
    ratingAverage: res.data.vote_average
  }
  return { movie }
}
export async function getRelatedMoviesId(id) {
  const res = await api(`movie/${id}/recommendations`)
  const moviesCategories = res.data.results.map((category) => ({
    id: category.id,
    title: category.title,
    poster: category.poster_path
  }))
  return { moviesCategories }
}

export async function getCategoriesGeneric(id, page) {
  const res = await api('discover/movie', {
    params: {
      with_genres: id,
      page
    }
  })
  const genericCategories = res.data.results.map((category) => ({
    id: category.id,
    poster: category.poster_path
  }))
  const totalPages = res.data.total_pages

  return { genericCategories, totalPages }
}

export async function getMoviesBySearch(query, page) {
  const res = await api('search/movie', {
    params: { query, page }
  })
  const movies = res.data.results.map((movie) => ({
    id: movie.id,
    poster: movie.poster_path
  }))
  const totalPages = res.data.total_pages

  return { movies, totalPages }
}
