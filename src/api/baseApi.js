import axios from 'axios'
import { API_KEY } from './secret'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  params: { api_key: API_KEY, language: 'en-US' }
})

export async function getTrendingMovies(page) {
  const {
    data: { results: movies, total_pages: totalPagesApi }
  } = await api('trending/movie/day', {
    params: {
      page
    }
  })
  return { movies, totalPagesApi }
}
