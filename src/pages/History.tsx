import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Trash2, 
  ArrowRight, 
  Search, 
  Filter,
  History as HistoryIcon,
  ChevronRight
} from 'lucide-react';
import { Trip, User } from '../types';
import { Storage } from '../lib/storage';
import { formatDate } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  user: User | null;
}

export default function History({ user }: Props) {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setTrips(Storage.getTrips());
  }, [user, navigate]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this trip?')) {
      Storage.deleteTrip(id);
      setTrips(trips.filter(t => t.id !== id));
    }
  };

  const filteredTrips = trips.filter(trip => 
    trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.style.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-10 mb-12 md:mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-slate-200 dark:border-slate-700">
             Legacy Journeys
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">Your Adventure <br className="hidden md:block" /> Archive</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-4 max-w-lg leading-relaxed">A comprehensive logging of every itinerary crafted by the SmartTrip AI engine for your profile.</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
           <div className="relative flex-grow md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Find a journey..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 dark:text-white transition-all text-sm font-medium"
              />
           </div>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {filteredTrips.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 md:py-32 bg-white dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 rounded-[40px]"
          >
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-slate-100 dark:border-slate-700">
               <HistoryIcon className="w-10 h-10 text-slate-300 dark:text-slate-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Archive is Empty</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-3 mb-10 max-w-sm mx-auto px-4">You haven't preserved any itineraries yet. Generate one in the dashboard to start your archive.</p>
            <Link 
              to="/dashboard"
              className="px-10 py-4 bg-slate-900 dark:bg-blue-600 text-white font-black rounded-xl hover:bg-black dark:hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-slate-200 dark:shadow-blue-900/10 inline-block text-sm"
            >
              Start Planning
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {filteredTrips.map((trip, idx) => (
              <motion.div
                key={trip.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-slate-100 dark:hover:shadow-blue-900/10 transition-all"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/${trip.destination}/800/600`}
                    alt={trip.destination}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-80 dark:opacity-60 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase text-white/60 tracking-[0.2em] mb-1">{formatDate(trip.createdAt)}</p>
                      <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter">{trip.destination}</h3>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex gap-4 mb-8">
                    <div className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700 flex items-center gap-2">
                       <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                       <span className="text-xs font-black text-slate-700 dark:text-slate-300 tracking-tight">{trip.duration} Days</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700 flex items-center gap-2">
                       <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                       <span className="text-xs font-black text-slate-700 dark:text-slate-300 tracking-tight uppercase">{trip.style}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/dashboard', { state: { trip } })}
                      className="px-6 py-2.5 bg-slate-900 dark:bg-slate-800 text-white rounded-lg font-black text-xs hover:bg-blue-600 dark:hover:bg-blue-700 transition-all flex items-center gap-2 border border-transparent dark:border-slate-700"
                    >
                      Restore Plan <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    <button 
                      onClick={(e) => handleDelete(trip.id, e)}
                      className="p-2.5 text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5 stroke-[2.5px]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
