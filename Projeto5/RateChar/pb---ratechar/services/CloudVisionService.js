import {GOOGLE_CLOUD_CONFIG} from '../api/googleCloud';

export const analyzeAndIdentifyCelebrity = async (base64Image) => {
    try {
      const response = await fetch(
        `${GOOGLE_CLOUD_CONFIG.apiEndpoint}/images:annotate?key=${GOOGLE_CLOUD_CONFIG.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requests: [{
              image: {
                content: base64Image
              },
              features: [
                {
                  type: 'WEB_DETECTION',
                  maxResults: 5
                },
                {
                  type: 'FACE_DETECTION',
                  maxResults: 5
                },
                {
                  type: 'LABEL_DETECTION',
                  maxResults: 5
                }
              ],
              imageContext: {
                webDetectionParams: {
                  includeGeoResults: false,
                },
                languageHints: ['pt-BR', 'en'],
              }
            }]
          })
        }
      );
  
      if (!response.ok) {
        throw new Error(`Erro na resposta da API do Google Cloud Vision: ${response.status}`);
      }
  
      const data = await response.json();

      if (!data.responses?.[0]?.webDetection?.webEntities) {
        throw new Error('Personalidade não identificada');
      }
  
      const celebrities = data.responses[0].webDetection.webEntities
        .filter(entity => entity.description && entity.score > 0.7)
        .map(entity => entity.description);
  
      if (!celebrities.length) {
        throw new Error('Nenhuma celebridade encontrada na foto');
      }
  
      return celebrities[0];
    } catch (error) {
      console.error('Erro na API do Google Cloud Vision:', error);
      throw error;
    }
  };