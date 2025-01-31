import { TMDB_API } from '../api/tmdb';


// Popular Actors
export const fetchPopularActors = async () => {
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNThiOWZkNjhlODgyNGJjN2U2YjVhODVkN2VhN2QwNyIsIm5iZiI6MTcyOTk3MTQ5Ny41OTA2Nywic3ViIjoiNjZhZTUxN2Y3YjQ2MTE3NzU5MzljYmMwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.5oIxOi8eHkf4t7aVgdHnG67xZvIWITWU-UedDTAoHpk";

  try {
    const response = await fetch(
      `${TMDB_API.BASE_URL}${TMDB_API.ENDPOINTS.POPULAR_ACTORS}?language=pt-BR&page=1`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar atores populares: ${response.statusText}`);
    }

    const result = await response.json();
    return result.results;
  } catch (error) {
    console.error("Erro na chamada do endpoint de atores populares", error);
    throw error;
  }
};

// Actor Details
export const fetchActorDetails = async (actorId) => {
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNThiOWZkNjhlODgyNGJjN2U2YjVhODVkN2VhN2QwNyIsIm5iZiI6MTcyOTk3MTQ5Ny41OTA2Nywic3ViIjoiNjZhZTUxN2Y3YjQ2MTE3NzU5MzljYmMwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.5oIxOi8eHkf4t7aVgdHnG67xZvIWITWU-UedDTAoHpk";

  try {
    const response = await fetch(
      `${TMDB_API.BASE_URL}${TMDB_API.ENDPOINTS.ACTOR_DETAILS(actorId)}?language=pt-BR`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar detalhes do ator: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar detalhes do ator:", error);
    throw error;
  }
};

// Actor Movie Credits
export const fetchActorMovieCredits = async (actorId) => {
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNThiOWZkNjhlODgyNGJjN2U2YjVhODVkN2VhN2QwNyIsIm5iZiI6MTcyOTk3MTQ5Ny41OTA2Nywic3ViIjoiNjZhZTUxN2Y3YjQ2MTE3NzU5MzljYmMwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.5oIxOi8eHkf4t7aVgdHnG67xZvIWITWU-UedDTAoHpk";

  try {
    const response = await fetch(
      `${TMDB_API.BASE_URL}${TMDB_API.ENDPOINTS.ACTOR_CREDITS(actorId)}?language=pt-BR`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar créditos do ator: ${response.statusText}`);
    }

    const data = await response.json();
    return data.cast;
  } catch (error) {
    console.error("Erro ao buscar créditos do ator:", error);
    throw error;
  }
};

//Search Actors
export const searchActors = async (query) => {
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNThiOWZkNjhlODgyNGJjN2U2YjVhODVkN2VhN2QwNyIsIm5iZiI6MTcyOTk3MTQ5Ny41OTA2Nywic3ViIjoiNjZhZTUxN2Y3YjQ2MTE3NzU5MzljYmMwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.5oIxOi8eHkf4t7aVgdHnG67xZvIWITWU-UedDTAoHpk";

  try {
    const response = await fetch(
      `${TMDB_API.BASE_URL}${TMDB_API.ENDPOINTS.SEARCH_ACTORS(query)}&language=pt-BR&include_adult=false`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar atores: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Erro ao buscar atores:", error);
    throw error;
  }
};