import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from '../constants';

// This uses the API key you've set in your .env file
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable not set");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: SYSTEM_PROMPT,
});

// We will manage the chat session within the ChatWindow component itself.
// So, we export the model directly.
export { model };