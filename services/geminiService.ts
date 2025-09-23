<<<<<<< HEAD
import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const createChatSession = (): Chat => {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_PROMPT,
    },
  });
  return chat;
};

export const sendMessageToAI = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini API:", error);
    return "I'm sorry, I encountered an error and couldn't process your message. Please try again.";
  }
};
=======
// No longer need the Chat import
let chatHistory: any[] = [];

export const createChatSession = () => { // The return type is no longer needed
    chatHistory = [];
    // This function now only resets the history
};

export const sendMessageToAI = async (message: string): Promise<string> => {
    try {
        const response = await fetch('http://localhost:3001/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, history: chatHistory }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response from the backend.');
        }

        const data = await response.json();
        chatHistory.push({ role: 'user', parts: [{text: message}] });
        chatHistory.push({ role: 'model', parts: [{text: data.text}] });
        return data.text;
    } catch (error) {
        console.error("Error sending message to the backend:", error);
        return "I'm sorry, I encountered an error and couldn't process your message. Please try again.";
    }
};
>>>>>>> ed3a2cf (Frontend: Intial Commit)
