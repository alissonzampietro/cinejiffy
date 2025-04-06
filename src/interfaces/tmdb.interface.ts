import type { SortsBy } from "@/enums/movie.enum";

export interface TmdbResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    adult: boolean;
    video: boolean;
    popularity: number;
    vote_count: number;
    original_title: string;
    original_language: string;
    genre_ids: number[];
}

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
    genres: Genre[];
    runtime: number;
    status: string;
    tagline: string;
    budget: number;
    revenue: number;
    homepage: string;
}

export interface MovieFilters {
    query: string;
    genres: number[];
    year: number | null;
    minRating: number;
    sortBy: SortsBy;
}

export interface MovieResponse extends TmdbResponse<Movie> {}
    


