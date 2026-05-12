import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Storage } from '../lib/storage';
import { User } from '../types';
import { motion } from 'motion/react';

interface Props {
  onLogin: (user: User) => void;
}

export default function Login({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = (location.state as any)?.message;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = Storage.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      onLogin(user);
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-blue-900/5">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Welcome Back.</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-2">Enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {successMessage && (
               <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-lg border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                {successMessage}
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/30 text-xs font-bold">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 w-4 h-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-900/20 focus:border-blue-500 dark:focus:border-blue-700 transition-all outline-none text-sm font-medium dark:text-white"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">Password</label>
                <a href="#" className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline uppercase tracking-widest">Reset</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 w-4 h-4" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-900/20 focus:border-blue-500 dark:focus:border-blue-700 transition-all outline-none text-sm font-medium dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-slate-900 dark:bg-blue-600 text-white font-black rounded-xl hover:bg-black dark:hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-3 text-sm"
            >
              Sign In <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-10 py-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
              New to travel?{' '}
              <Link to="/register" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
