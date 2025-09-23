import React from 'react';
import { ChatMessage, MessageRole } from '../types';
import { BotIcon } from './icons/BotIcon';
import { UserIcon } from './icons/UserIcon';
import { AlertIcon } from './icons/AlertIcon';

interface MessageProps {
  message: ChatMessage;
  isLoading?: boolean;
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
    </div>
);


const Message: React.FC<MessageProps> = ({ message, isLoading = false }) => {
  const isUser = message.role === MessageRole.USER;
  const isSystem = message.role === MessageRole.SYSTEM;

  const containerClasses = `flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'}`;
  
  const bubbleClasses = `px-4 py-3 rounded-2xl max-w-lg md:max-w-xl lg:max-w-2xl break-words ${
    isUser
      ? 'bg-blue-500 text-white rounded-br-lg'
      : isSystem
      ? 'bg-red-100 border border-red-200 text-red-800 rounded-bl-lg'
      : 'bg-white text-slate-700 rounded-bl-lg shadow-sm border border-slate-200'
  }`;

  const Avatar = () => {
    if (isUser) return <UserIcon className="w-8 h-8 text-slate-400" />;
    if (isSystem) return <AlertIcon className="w-8 h-8 text-red-500" />;
    return <BotIcon className="w-8 h-8 text-teal-500" />;
  };
  
  // A simple markdown-to-html conversion for bold and newlines
  const formatText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className={containerClasses}>
      {!isUser && (
        <div className="flex-shrink-0">
          <Avatar />
        </div>
      )}
      <div className={bubbleClasses}>
        {isLoading ? <TypingIndicator /> : <p className="text-sm" dangerouslySetInnerHTML={{ __html: formatText(message.text) }} />}
      </div>
      {isUser && (
        <div className="flex-shrink-0">
          <Avatar />
        </div>
      )}
    </div>
  );
};

export default Message;
