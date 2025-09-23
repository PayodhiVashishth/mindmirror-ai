import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import { LogoIcon } from './icons/LogoIcon';
import NavTabs from './NavTabs';
import ScreeningHome from './ScreeningHome';
import { useAuth } from '../hooks/useAuth';
import { LogoutIcon } from './icons/LogoutIcon';
import ResourceHub from './ResourceHub';
import AppointmentHome from './AppointmentHome';

type Tab = 'chat' | 'screening' | 'resources' | 'appointments';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const { currentUser, logout } = useAuth();

  const renderContent = () => {
    switch(activeTab) {
      case 'chat':
        return <ChatWindow />;
      case 'screening':
        return <ScreeningHome />;
      case 'resources':
        return <ResourceHub />;
      case 'appointments':
        return <AppointmentHome />;
      default:
        return <ChatWindow />;
    }
  }

  return (
    <div className="flex flex-col h-screen antialiased text-slate-800">
      <header className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
            <LogoIcon className="h-8 w-8 text-teal-500" />
            <h1 className="text-xl font-bold text-slate-700">MindMirror AI</h1>
        </div>
        <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 hidden sm:block">Welcome, {currentUser?.username}</span>
            <button 
                onClick={logout} 
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
                aria-label="Logout"
            >
                <LogoutIcon className="w-5 h-5" />
            </button>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-4 bg-slate-100">
        <div className="w-full max-w-4xl h-full bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
          <div className="flex flex-col h-full">
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-grow overflow-y-auto bg-slate-50">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center p-2 text-xs text-slate-500 bg-slate-100">
        <p>MindMirror AI is a supportive companion, not a replacement for professional medical advice. For immediate help, please contact a crisis hotline.</p>
      </footer>
    </div>
  );
};

export default MainApp;