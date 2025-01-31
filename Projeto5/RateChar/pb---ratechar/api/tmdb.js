export const TMDB_API = {
  BASE_URL: "https://api.themoviedb.org/3",
  IMAGE_BASE_URL: "https://image.tmdb.org/t/p/w200",
  ENDPOINTS: {
    // Movie endpoints
    POPULAR_MOVIES: "/discover/movie",
    MOVIE_DETAILS: (id) => `/movie/${id}`,
    MOVIE_CREDITS: (id) => `/movie/${id}/credits`,
    SEARCH_MOVIES: (query) => `/search/movie?query=${encodeURIComponent(query)}`,
    
    // Actor endpoints
    POPULAR_ACTORS: "/person/popular",
    ACTOR_DETAILS: (id) => `/person/${id}`,
    ACTOR_CREDITS: (id) => `/person/${id}/movie_credits`,
    SEARCH_ACTORS: (query) => `/search/person?query=${encodeURIComponent(query)}`,
  }
};