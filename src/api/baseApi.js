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
  const totalPagesApi = res.data.total_pages
  return { movies, totalPagesApi }
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
