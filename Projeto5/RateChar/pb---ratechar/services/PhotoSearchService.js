import { searchActors } from './ActorService';
import { analyzeAndIdentifyCelebrity } from './CloudVisionService';

export const searchActorByPhoto = async (photoBase64) => {
  try {
    const celebrityName = await analyzeAndIdentifyCelebrity(photoBase64);
    if (!celebrityName) {
      throw new Error('Falha ao buscar o nome da personalidade');
    }

    const searchResults = await searchActors(celebrityName);
    if (!searchResults || searchResults.length === 0) {
      throw new Error('Personalidade não encontrada no TMDB');
    }

    return searchResults[0];
  } catch (error) {
    console.error('Erro na busca da foto:', error);
    throw error;
  }
};