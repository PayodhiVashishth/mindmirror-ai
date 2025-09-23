import React, { useState } from 'react';
import { useAuth } from '../hooks/UseAuth';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    setLoading(true);
    try {
      await register(username, password);
      // On success, the App component will redirect
    } catch (err: any) {
      setError(err.message || 'Failed to register. Please try another username.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Create Account</h2>
      <p className="text-center text-slate-500 mb-6">Get started with your confidential companion.</p>
      {error && <p className="bg-red-100 text-red-700 p-3 rounded-md text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          {/* FIX: Added the missing `className` prop name to the label. */}
          <label htmlFor="reg-username" className="block text-sm font-medium text-slate-600">Username</label>
          <input
            id="reg-username"
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
          <label htmlFor="reg-password" className="block text-sm font-medium text-slate-600">Password</label>
          <input
            id="reg-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-slate-900"
            placeholder="••••••••"
          />
        </div>
        <div>
          {/* FIX: Added the missing `className` prop name to the label. */}
          <label htmlFor="reg-confirm-password" className="block text-sm font-medium text-slate-600">Confirm Password</label>
          <input
            id="reg-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="font-medium text-teal-600 hover:text-teal-500">
          Sign In
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;