import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import WelcomeScreen from './components/WelcomeScreen';
import { LogoIcon } from './components/icons/LogoIcon';
import NavTabs from './components/NavTabs';
import ScreeningHome from './components/ScreeningHome';

const App: React.FC = () => {
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'screening'>('chat');

  const renderContent = () => {
    if (!isSessionStarted) {
      return <WelcomeScreen onStartChat={() => setIsSessionStarted(true)} />;
    }

    return (
      <div className="flex flex-col h-full">
        <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-grow overflow-y-auto">
          {activeTab === 'chat' && <ChatWindow />}
          {activeTab === 'screening' && <ScreeningHome />}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen antialiased text-slate-800">
      <header className="bg-white shadow-md p-4 flex items-center gap-3 sticky top-0 z-10">
        <LogoIcon className="h-8 w-8 text-teal-500" />
        <h1 className="text-xl font-bold text-slate-700">MindMirror AI</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl h-full bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
          {renderContent()}
        </div>
      </main>
      <footer className="text-center p-2 text-xs text-slate-500">
        <p>MindMirror AI is a supportive companion, not a replacement for professional medical advice. For immediate help, please contact a crisis hotline.</p>
      </footer>
    </div>
  );
};

export default App;
