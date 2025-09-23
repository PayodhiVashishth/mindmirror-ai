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
