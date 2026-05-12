import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Plane, History, Package, LogOut, Menu, X, User as UserIcon, Sun, Moon } from 'lucide-react';
import { User } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  user: User | null;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: Plane, protected: true },
    { name: 'History', path: '/history', icon: History, protected: true },
    { name: 'Packages', path: '/packages', icon: Package, protected: false },
  ];

  const filteredLinks = navLinks.filter(link => !link.protected || user);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
                <Plane className="text-white w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
                SmartTrip<span className="text-blue-600 dark:text-blue-400">AI</span>
              </span>
            </Link>
          </div>
 
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {filteredLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-all py-5 border-b-2 ${
                  location.pathname === link.path 
                    ? 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400' 
                    : 'text-slate-500 border-transparent hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all active:scale-90"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
 
            {user ? (
              <div className="flex items-center gap-6 pl-6 border-l border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 pr-4 pl-1 py-1 rounded-full group cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <div className="w-7 h-7 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center font-bold text-[10px]">
                    {user.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-bold text-white bg-slate-900 dark:bg-blue-600 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-all active:scale-95 shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
 
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-slate-600 dark:text-slate-400 hover:text-blue-600"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
 
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {filteredLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium ${
                    location.pathname === link.path
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}
              
              {user ? (
                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3 px-3 py-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <UserIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-3 text-red-600 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-3 py-3 rounded-lg text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-3 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
