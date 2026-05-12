import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Briefcase, 
  Zap, 
  Hotel, 
  Utensils, 
  Map as MapIcon, 
  ArrowRight, 
  Printer, 
  Save,
  CheckCircle,
  Clock,
  Car,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { User, Trip } from '../types';
import { plannerService } from '../services/planner';
import { Storage } from '../lib/storage';
import MapComponent from '../components/MapComponent';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  user: User | null;
}

export default function Dashboard({ user }: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [formData, setFormData] = useState({
    startLocation: '',
    destination: '',
    duration: 3,
    budget: '1000',
    style: 'Solo',
    interests: [] as string[],
    transport: 'Flight'
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const trip = await plannerService.generateItinerary({
        ...formData,
        userId: user?.id
      });
      setCurrentTrip(trip);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (currentTrip && user) {
      Storage.saveTrip(currentTrip);
      alert('Trip saved to your history!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleInterest = (id: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id) 
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id]
    }));
  };

  const interestOptions = ['Nature', 'Adventure', 'Food', 'Spiritual', 'Shopping'];

  if (!user) return null;

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] md:h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 relative transition-colors duration-300">
      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/80 dark:bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center text-white"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-blue-600 p-6 rounded-[2rem] shadow-2xl shadow-blue-500/20 mb-8"
            >
              <Zap className="w-12 h-12 fill-current" />
            </motion.div>
            
            <div className="text-center space-y-4 px-6">
              <h2 className="text-2xl font-black tracking-tighter">Crafting Your Legend...</h2>
              <div className="flex gap-1 justify-center">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 h-2 bg-blue-500 rounded-full"
                  />
                ))}
              </div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest pt-4">Analyzing Global Logistics & AI Optimization</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar: Planner Controls */}
      <aside className="w-full md:w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6 shrink-0 md:overflow-y-auto no-print transition-all">
        <div>
          <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Plan Your Trip</h2>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Starting From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 w-3.5 h-3.5" />
                <input
                  type="text"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium dark:text-white"
                  placeholder="San Francisco, CA"
                  value={formData.startLocation}
                  onChange={e => setFormData({...formData, startLocation: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-3.5 h-3.5" />
                <input
                  type="text"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium dark:text-white"
                  placeholder="Paris, France"
                  value={formData.destination}
                  onChange={e => setFormData({...formData, destination: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Days</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium dark:text-white"
                  value={formData.duration}
                  onChange={e => setFormData({...formData, duration: Number(e.target.value)})}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Budget ($)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium dark:text-white"
                  value={formData.budget}
                  onChange={e => setFormData({...formData, budget: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
               <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Travel Style</label>
               <div className="flex flex-wrap gap-2">
                {['Solo', 'Family', 'Couple', 'Friends'].map(style => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setFormData({...formData, style})}
                    className={`flex-1 min-w-[70px] py-2 border rounded-xl text-[10px] font-black transition-all uppercase tracking-tighter ${
                      formData.style === style 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' 
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Transport</label>
              <select 
                value={formData.transport}
                onChange={e => setFormData({...formData, transport: e.target.value})}
                className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium outline-none dark:text-white appearance-none"
              >
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Flight">Flight</option>
                <option value="Car">Car</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-4 mt-4 bg-blue-600 dark:bg-blue-600 text-white text-sm font-black rounded-xl shadow-lg shadow-blue-200 dark:shadow-blue-900/10 transition-all uppercase tracking-widest ${
                loading ? 'opacity-50' : 'hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <Zap className="animate-pulse w-4 h-4 mx-auto" />
              ) : (
                'Generate Itinerary'
              )}
            </motion.button>
          </form>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
           <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/20">
              <p className="text-[10px] text-blue-800 dark:text-blue-400 font-black uppercase mb-1 tracking-widest">Traveler Tip</p>
              <p className="text-xs text-blue-600 dark:text-blue-300/70 leading-relaxed italic font-medium">
                "Pack light and prioritize comfortable walking shoes for city explorations."
              </p>
           </div>
        </div>
      </aside>

      {/* Main Display: Results */}
      <section className="flex-1 bg-slate-50 dark:bg-slate-950 p-4 md:p-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          {!currentTrip ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[500px] text-center"
            >
              <div className="w-20 h-20 bg-white dark:bg-slate-900 shadow-xl rounded-2xl flex items-center justify-center mb-8 rotate-3 border border-slate-100 dark:border-slate-800">
                <MapIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">Your Journey Awaits</h1>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm font-medium leading-relaxed">
                Use the planner on the left to generate a professional, AI-optimized itinerary for your next trip.
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key={currentTrip.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl mx-auto space-y-10"
            >
              {/* Header Section */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded">AI-Optimized</span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">Planned {new Date().toLocaleDateString()}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{currentTrip.destination} Trek</h1>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">A curated {currentTrip.duration}-day journey for {currentTrip.style.toLowerCase()} travelers.</p>
                </div>
                <div className="flex w-full md:w-auto gap-3 no-print">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrint} 
                    className="flex-1 md:flex-none px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-black shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    Print
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave} 
                    className="flex-1 md:flex-none px-6 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-xl text-sm font-black shadow-sm hover:bg-black dark:hover:bg-blue-700 transition-all"
                  >
                    Save Trip
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Itinerary */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="space-y-6">
                    {currentTrip.itinerary.map(day => (
                      <div key={day.day} className="bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex justify-between items-center">
                          <h3 className="font-black text-slate-800 dark:text-white flex items-center gap-3 tracking-tight">
                            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-black">{day.day}</span>
                            Day {day.day}: Local Immersion
                          </h3>
                        </div>
                        <div className="p-8 space-y-8">
                          {day.activities.map((activity, idx) => (
                            <div key={idx} className="flex gap-6 group">
                              <div className="w-12 shrink-0 text-center text-[10px] font-black text-slate-300 dark:text-slate-700 mt-1 uppercase tracking-tighter group-hover:text-blue-600 transition-colors">
                                {activity.time}
                              </div>
                              <div className={idx === 1 ? "p-5 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-2xl flex-1 shadow-sm" : "flex-1 pb-8 border-b border-slate-50 dark:border-slate-800/50 last:border-0"}>
                                <p className={`font-black text-sm mb-1 tracking-tight ${idx === 1 ? 'text-blue-900 dark:text-blue-300' : 'text-slate-800 dark:text-slate-200'}`}>{activity.title}</p>
                                <p className={`text-xs leading-relaxed ${idx === 1 ? 'text-blue-700/80 dark:text-blue-400/80' : 'text-slate-500 dark:text-slate-400 font-medium'}`}>{activity.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Premium Stays</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentTrip.hotels.slice(0, 2).map(hotel => (
                        <div key={hotel.id} className="bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm flex gap-4 hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer group">
                          <img src={hotel.image} className="w-20 h-20 rounded-2xl object-cover opacity-80 group-hover:opacity-100 transition-all" referrerPolicy="no-referrer" />
                          <div className="flex flex-col justify-between py-1">
                            <div>
                                <p className="font-black text-slate-900 dark:text-white text-sm mb-0.5 tracking-tight">{hotel.name}</p>
                                <div className="text-yellow-400 text-[8px] tracking-widest">★★★★★</div>
                            </div>
                            <p className="text-blue-600 dark:text-blue-400 font-black text-sm tracking-tighter">{hotel.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Sidebar Data */}
                <div className="space-y-8">
                   <div className="p-8 bg-slate-900 dark:bg-slate-900 rounded-[32px] text-white">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-8">Financial Overview</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-500">Accommodation</span>
                          <span className="font-mono text-slate-300 tracking-tight">${(currentTrip.estimatedCost * 0.4).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-500">Logistics & Airfare</span>
                          <span className="font-mono text-slate-300 tracking-tight">${(currentTrip.estimatedCost * 0.35).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-500">Cuisine & Entry Fees</span>
                          <span className="font-mono text-slate-300 tracking-tight">${(currentTrip.estimatedCost * 0.25).toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-slate-800 my-6"></div>
                        <div className="flex justify-between items-end">
                          <span className="font-black text-sm tracking-tight text-slate-400">Total Estimate</span>
                          <span className="text-2xl font-black text-blue-400 tracking-tighter">${currentTrip.estimatedCost.toFixed(0)}.00</span>
                        </div>
                      </div>
                   </div>

                   <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] overflow-hidden shadow-sm h-80 flex flex-col no-print transition-all">
                      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Route Geography</span>
                        <span className="text-[8px] bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded font-black">AI LIVE</span>
                      </div>
                      <div className="flex-1 bg-slate-100 dark:bg-slate-950 relative">
                        <MapComponent 
                          locations={[{ name: currentTrip.destination, lat: 48.8, lng: 2.3 }]} 
                          destination={currentTrip.destination} 
                        />
                        <div className="absolute top-4 left-4 p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-lg shadow-sm text-[8px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 border border-slate-100 dark:border-slate-800">
                           {currentTrip.destination} HUB • SECTOR 4
                        </div>
                      </div>
                   </div>

                   <div className="bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800 rounded-[32px] shadow-sm">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 px-1">Regional Intelligence</h4>
                      <div className="space-y-6">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-600 border border-slate-100 dark:border-slate-700 transition-colors hover:text-blue-500"><Utensils className="w-5 h-5" /></div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase leading-none mb-1 tracking-widest">Local Cuisine</p>
                               <p className="text-xs font-black text-slate-800 dark:text-white">Highly Recommended</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-600 border border-slate-100 dark:border-slate-700 transition-colors hover:text-emerald-500"><Calendar className="w-5 h-5" /></div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase leading-none mb-1 tracking-widest">Peak Season</p>
                               <p className="text-xs font-black text-slate-800 dark:text-white">May through September</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
