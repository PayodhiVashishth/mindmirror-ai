import React, { useState } from 'react';
import { LogoIcon } from './components/icons/LogoIcon';
import { useAuth } from './hooks/useAuth';
import AuthPage from './components/AuthPage';
import MainApp from './components/MainApp';

const App: React.FC = () => {
  const { currentUser } = useAuth();
    return (
    <>
      {currentUser ? <MainApp /> : <AuthPage />}
    </>
  );
};

export default App;
