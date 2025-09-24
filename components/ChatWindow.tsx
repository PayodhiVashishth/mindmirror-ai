import React, { useState, useEffect, useRef } from 'react';
import { ChatSession } from '@google/generative-ai';
import { model } from '../services/geminiService'; // 1. Corrected: Import 'model' instead of 'createChatSession'
import { ChatMessage, MessageRole } from '../types';
import { RED_FLAG_KEYWORDS, RED_FLAG_RESPONSE } from '../constants';
import Message from './Message';
import ChatInput from './ChatInput';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<ChatSession | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 2. Corrected: Initialize the chat session here using the imported model
  useEffect(() => {
    const newChat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });
    setChat(newChat);
    setMessages([
      {
        role: MessageRole.MODEL,
        text: "Hi there! I'm MindMirror AI, your confidential wellness companion. How are you feeling today?",
        timestamp: Date.now(),
      },
    ]);
  }, []);


  const handleSendMessage = async (inputText: string) => {
    if (!inputText.trim() || isLoading || !chat) return;

    const userMessage: ChatMessage = {
      role: MessageRole.USER,
      text: inputText,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const lowerCaseInput = inputText.toLowerCase();
    const isRedFlag = RED_FLAG_KEYWORDS.some(keyword => lowerCaseInput.includes(keyword));

    if (isRedFlag) {
        const crisisMessage: ChatMessage = {
            role: MessageRole.SYSTEM,
            text: RED_FLAG_RESPONSE,
            timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, crisisMessage]);
        setIsLoading(false);
        return;
    }

    try {
      // 3. Corrected: Use the chat session stored in state
      const result = await chat.sendMessage(inputText);
      const response = result.response;
      const aiResponseText = response.text();

      const aiMessage: ChatMessage = {
        role: MessageRole.MODEL,
        text: aiResponseText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      const errorMessage: ChatMessage = {
        role: MessageRole.MODEL,
        text: "I'm sorry, I encountered an error. Please try again.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {messages.map((msg) => (
            <Message key={msg.timestamp} message={msg} />
          ))}
          {isLoading && (
             <Message message={{ role: MessageRole.MODEL, text: "...", timestamp: 0}} isLoading={true} />
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;