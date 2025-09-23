import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { createChatSession, sendMessageToAI } from '../services/geminiService';
import { ChatMessage, MessageRole } from '../types';
import { RED_FLAG_KEYWORDS, RED_FLAG_RESPONSE } from '../constants';
import Message from './Message';
import ChatInput from './ChatInput';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeChat = useCallback(() => {
    const newChat = createChatSession();
    setChat(newChat);
    setMessages([
      {
        role: MessageRole.MODEL,
        text: "Hi there! I'm MindMirror AI, your confidential wellness companion. How are you feeling today?",
        timestamp: Date.now(),
      },
    ]);
  }, []);
  
  useEffect(() => {
    initializeChat();
  }, [initializeChat]);


  const handleSendMessage = async (inputText: string) => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: MessageRole.USER,
      text: inputText,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Red Flag Check
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

    if (chat) {
      const aiResponseText = await sendMessageToAI(chat);
      const aiMessage: ChatMessage = {
        role: MessageRole.MODEL,
        text: aiResponseText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMessage]);
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
