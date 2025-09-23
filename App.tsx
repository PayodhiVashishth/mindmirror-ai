import React from 'react';
import { useAuth } from './hooks/useAuth';
import AuthPage from './components/AuthPage';
import MainApp from './components/MainApp';

const App: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="bg-slate-100 h-screen w-screen">
      {currentUser ? <MainApp /> : <AuthPage />}
    </div>
  );
};

export default App;