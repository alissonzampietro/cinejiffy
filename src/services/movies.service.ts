import type { PopularMovies } from "@/interfaces/tmdb.interface"

const apiUrl = import.meta.env.MOVIE_SOURCE_BASE_URL
const apiKey = import.meta.env.MOVIE_SOURCE_API_KEY

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
}

export const fetchMovies = async (page = 1): Promise<PopularMovies> => {
    const response = await fetch(`${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`, { headers: defaultHeaders })

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data
}
  