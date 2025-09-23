import React from 'react';
import { ChatIcon } from './icons/ChatIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { CalendarIcon } from './icons/alendarIcon';

type Tab = 'chat' | 'screening' | 'resources' | 'appointments';

interface NavTabsProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const NavTabs: React.FC<NavTabsProps> = ({ activeTab, setActiveTab }) => {
  const getTabClasses = (tabName: Tab) => {
    const isActive = activeTab === tabName;
    return `flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
      ${isActive
        ? 'border-teal-500 text-teal-600'
        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
      }`;
  };

  return (
    <nav className="flex border-b border-slate-200 bg-white">
      <button onClick={() => setActiveTab('chat')} className={getTabClasses('chat')}>
        <ChatIcon className="w-5 h-5" />
        Chat
      </button>
      <button onClick={() => setActiveTab('screening')} className={getTabClasses('screening')}>
        <ClipboardIcon className="w-5 h-5" />
        Screening Tools
      </button>
      <button onClick={() => setActiveTab('resources')} className={getTabClasses('resources')}>
        <BookOpenIcon className="w-5 h-5" />
        Resources
      </button>
      <button onClick={() => setActiveTab('appointments')} className={getTabClasses('appointments')}>
        <CalendarIcon className="w-5 h-5" />
        Appointments
      </button>
    </nav>
  );
};

export default NavTabs;