import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { getAIResponse } from './aiService';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const text = await getAIResponse(message, history);
    res.json({ text });
    
  } catch (error) {
    console.error(error);
    // Send a generic error message to the client
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});