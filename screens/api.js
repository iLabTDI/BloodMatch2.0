import React from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY ='AIzaSyA-JwabyU1H1u9U0AyENhyCr0-EXJyvzUg';

const handleGenericAPIRequest = async (message) => {
    console.log("El mensaje enviado es: " + message);

    if (!message.trim()) return null; 
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: message }],
                },
            ],
            generationConfig: {
                maxOutputTokens: 100,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = await response.text();
        console.log("La respuesta es: " + text);
        return text;
    } catch (error) {
        console.error("Error sending chat request:", error);
        const response2 = await error.response;
        const text2 = "Error sending chat request:Resource has been exhausted";
        return text2
    }
};

export default handleGenericAPIRequest;
