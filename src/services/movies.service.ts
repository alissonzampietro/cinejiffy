import type { Genre, Movie, MovieDetails, MovieFilters, MovieResponse } from "@/interfaces/tmdb.interface"

const apiUrl = import.meta.env.VITE_TMDB_API_BASE_URL
const apiKey = import.meta.env.VITE_TMDB_API_KEY
const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
}

export const getImageUrl = (path: string, size: 'w500' | 'original' = 'w500'): string => {
    return path ? `${imageBaseUrl}${size}${path}` : ''
}

export const fetchMovies = async (filters: MovieFilters, page = 1): Promise<MovieResponse> => {
    const params = new URLSearchParams({
        api_key: apiKey,
        language: 'en-US',
        page: page.toString(),
        include_adult: 'false',
        include_video: 'false',
        sort_by: filters.sortBy
    })

    if (filters.query) {
        params.append('query', filters.query)
    }

    if (filters.genres.length > 0) {
        params.append('with_genres', filters.genres.join(','))
    }

    if (filters.year) {
        params.append('primary_release_year', filters.year.toString())
    }

    if (filters.minRating > 0) {
        params.append('vote_average.gte', filters.minRating.toString())
    }

    const endpoint = filters.query ? 'search/movie' : 'discover/movie'
    const response = await fetch(`${apiUrl}/${endpoint}?${params.toString()}`, { headers: defaultHeaders })

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data
}

export const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
    const response = await fetch(`${apiUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`, { headers: defaultHeaders })

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data
}

export const fetchSimilarMovies = async (movieId: number, page = 1): Promise<MovieResponse> => {
    const response = await fetch(`${apiUrl}/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=${page}`, { headers: defaultHeaders })

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data
}

export const fetchGenres = async (): Promise<{ genres: Genre[] }> => {
    const response = await fetch(`${apiUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`, { headers: defaultHeaders })

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data
}