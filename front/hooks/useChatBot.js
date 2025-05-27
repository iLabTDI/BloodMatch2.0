import { useState } from "react";
import Constants from "expo-constants";

export const useChatbot = (message) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const sendMessage = async (message = []) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                Constants.expoConfig.extra.CHATBOT_API_URL,
                {
                    method: "POST",
                    headers: {
                        Authorization: Constants.expoConfig.extra.CHAtBOT_TOKEN,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "in-0": message,
                        "doc-0": [
                            "URL_TO_FILE_1",
                            "URL_TO_FILE_2",
                            "URL_TO_FILE_N",
                        ],
                        user_id: `<USER or Conversation ID>`,
                    }),
                }
            );

            const result = await res.json();
            const answer = result.outputs["out-0"];
            setResponse(answer);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { response, loading, error, sendMessage };
};
