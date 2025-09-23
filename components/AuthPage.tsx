import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { LogoIcon } from './icons/LogoIcon';

const AuthPage: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
            <LogoIcon className="w-16 h-16 text-teal-500" />
        </div>
        <div className="bg-white rounded-xl shadow-2xl p-8 border border-slate-200">
          {isLoginView ? (
            <LoginForm onSwitchToRegister={() => setIsLoginView(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLoginView(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
