
/*
import React from 'react';

const handleGenericAPIRequest = async (message) => {
    console.log("el mesnaje enviado es"+answer)
    if (!message.trim()) return null; // No hacer nada si el mensaje está vacío
   
    const dataToSend = {
      model: "gpt-3.5-turbo",
      messages: [{ role: 'user', content: message }],
    };
  
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`, // Cambia esto por tu clave API real
      },
      body: JSON.stringify(dataToSend),
    });
  
    const completion = await response.json();
    const answer=completion.choices[0].message.content;
    console.log("la respuesta es"+answer)
    return completion.choices[0].message.content;
  };
  
  export default handleGenericAPIRequest ;
  */