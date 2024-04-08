/* // api.js
import axios from 'axios';

export const sendMessageToChatGPT = async (message) => {
  try {
    // Realizar una solicitud POST a la API de ChatGPT con el mensaje del usuario
    const response = await axios.post('https://chat.openai.com', {
      message: message
    });

    // Devolver la respuesta del modelo de ChatGPT
    return response.data.message;
  } catch (error) {
    // Manejar errores de solicitud
    console.error('Error al enviar mensaje a ChatGPT:', error);
    // Devolver un mensaje de error genérico
    return "Lo siento, ocurrió un error al procesar tu solicitud.";
  }
};
 */