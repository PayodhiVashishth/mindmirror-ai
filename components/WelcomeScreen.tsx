import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

interface WelcomeScreenProps {
  onStartChat: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartChat }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gradient-to-br from-teal-50 to-blue-50">
      <LogoIcon className="w-24 h-24 text-teal-500 mb-6" />
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome to MindMirror AI</h2>
      <p className="max-w-md text-slate-600 mb-8">
        Your confidential space to talk about what's on your mind. I'm here to listen, support you, and help you find clarity.
      </p>
      <button
        onClick={onStartChat}
        className="px-8 py-3 bg-teal-500 text-white font-semibold rounded-full shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
      >
        Start a Conversation
      </button>
    </div>
  );
};

export default WelcomeScreen;
