export interface TmdbResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
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
}

export interface PopularMovies extends TmdbResponse<Movie[]> {}
    


