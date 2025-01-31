import { TMDB_API } from '../api/tmdb';


//Popular Movies
export const fetchPopularMovies = async () => {
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNThiOWZkNjhlODgyNGJjN2U2YjVhODVkN2VhN2QwNyIsIm5iZiI6MTcyOTk3MTQ5Ny41OTA2Nywic3ViIjoiNjZhZTUxN2Y3YjQ2MTE3NzU5MzljYmMwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.5oIxOi8eHkf4t7aVgdHnG67xZvIWITWU-UedDTAoHpk";

  try {
    const response = await fetch(
      `${TMDB_API.BASE_URL}${TMDB_API.ENDPOINTS.POPULAR_MOVIES}?include_adult=false&include_video=false&language=pt-BR&page=1&region=brazil&sort_by=popularity.desc`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    return result.results;
  } catch (error) {
    console.error("Erro na chamada do endpoint Filmes Populares", error);
    throw error;
  }
};

//Movie Details
export const fetchMovieDetails = async (movieId) => {
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNThiOWZkNjhlODgyNGJjN2U2YjVhODVkN2VhN2QwNyIsIm5iZiI6MTcyOTk3MTQ5Ny41OTA2Nywic3ViIjoiNjZhZTUxN2Y3YjQ2MTE3NzU5MzljYmMwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.5oIxOi8eHkf4t7aVgdHnG67xZvIWITWU-UedDTAoHpk";

  try {
    const response = await fetch(
      `${TMDB_API.BASE_URL}${TMDB_API.ENDPOINTS.MOVIE_DETAILS(movieId)}?language=pt-BR&append_to_response=credits`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar detalhes do filme: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

//Search Movies
export const searchMovies = async (query) => {
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNThiOWZkNjhlODgyNGJjN2U2YjVhODVkN2VhN2QwNyIsIm5iZiI6MTcyOTk3MTQ5Ny41OTA2Nywic3ViIjoiNjZhZTUxN2Y3YjQ2MTE3NzU5MzljYmMwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.5oIxOi8eHkf4t7aVgdHnG67xZvIWITWU-UedDTAoHpk";

  try {
    const response = await fetch(
      `${TMDB_API.BASE_URL}${TMDB_API.ENDPOINTS.SEARCH_MOVIES(query)}&language=pt-BR&include_adult=false`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar filmes: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    throw error;
  }
};