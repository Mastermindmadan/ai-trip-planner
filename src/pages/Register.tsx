import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { Storage } from '../lib/storage';
import { motion } from 'motion/react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = Storage.getUsers();
    if (users.find(u => u.email === email)) {
      setError('Email already exists');
      return;
    }

    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      password,
    };

    Storage.saveUser(newUser);
    navigate('/login', { state: { message: 'Registration successful! Please login.' } });
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-blue-900/5">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Sign Up.</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-2">Start your journeys today.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/30 text-xs font-bold">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 w-4 h-4" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-900/20 focus:border-blue-500 dark:focus:border-blue-700 transition-all outline-none text-sm font-medium dark:text-white"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

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
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest ml-1">Password</label>
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

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest ml-1">Confirm</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 w-4 h-4" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-900/20 focus:border-blue-500 dark:focus:border-blue-700 transition-all outline-none text-sm font-medium dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-slate-900 dark:bg-blue-600 text-white font-black rounded-xl hover:bg-black dark:hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-3 text-sm mt-4"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-10 py-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
