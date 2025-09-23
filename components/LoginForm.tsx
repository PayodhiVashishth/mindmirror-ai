import React, { useState } from 'react';
import { useAuth } from '../hooks/UseAuth';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      // On success, the App component will redirect
    } catch (err: any) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Welcome Back</h2>
      <p className="text-center text-slate-500 mb-6">Please sign in to your account.</p>
      {error && <p className="bg-red-100 text-red-700 p-3 rounded-md text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login-username" className="block text-sm font-medium text-slate-600">Username</label>
          <input
            id="login-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-900"
            placeholder="e.g., StudentID"
          />
        </div>
        <div>
          {/* FIX: Added the missing `className` prop name to the label. */}
          <label htmlFor="login-password" className="block text-sm font-medium text-slate-600">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-900"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-300"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <button onClick={onSwitchToRegister} className="font-medium text-teal-600 hover:text-teal-500">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;