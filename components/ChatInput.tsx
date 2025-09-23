import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from './icons/SendIcon';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [text]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 bg-white border-t border-slate-200">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          rows={1}
          className="flex-grow p-3 bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none max-h-40 text-slate-900"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="p-3 bg-teal-500 text-white rounded-full disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75 transition-colors"
        >
          <SendIcon className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;