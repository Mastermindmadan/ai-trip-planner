import React, { useState } from 'react';
import { 
  Package, 
  Star, 
  Clock, 
  Tag, 
  ArrowRight, 
  Search,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { SAMPLE_PACKAGES } from '../constants';
import { motion } from 'motion/react';

export default function Packages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const filtered = SAMPLE_PACKAGES.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      {/* Header Section */}
      <div className="pt-20 md:pt-24 pb-12 md:pb-16 px-6 relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
         <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                 Elite Collection
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tighter leading-tight italic">Curated <span className="text-blue-600 dark:text-blue-400">Packages.</span></h1>
              <p className="text-slate-500 dark:text-slate-400 text-base md:text-xl font-medium leading-relaxed max-w-xl">
                A definitive collection of global itineraries, analyzed and verified for maximum cultural engagement and optimal logistics.
              </p>
            </motion.div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-6 md:-mt-8 mb-24 md:mb-32">
        {/* Search & Controller */}
        <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none flex flex-col md:flex-row gap-3 mb-12 md:mb-16">
           <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Target Destination..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-6 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all outline-none font-bold text-sm tracking-tight dark:text-white"
              />
           </div>
           <div className="flex gap-2">
              <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                 <Filter className="w-3.5 h-3.5 text-slate-400" />
                 <select 
                  className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none text-slate-500 dark:text-slate-400"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                 >
                   <option value="rating">Popularity</option>
                   <option value="price">Valuation</option>
                 </select>
              </div>
           </div>
        </div>

        {/* Inventory Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {filtered.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-slate-100 dark:hover:shadow-blue-900/10 transition-all border-b-4 border-b-slate-100 dark:border-b-slate-800 hover:border-b-blue-600 dark:hover:border-b-blue-500"
            >
              <div className="aspect-[16/10] relative overflow-hidden bg-slate-900">
                <img 
                  src={pkg.image} 
                  alt={pkg.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 py-1 px-2.5 bg-white dark:bg-slate-900 rounded-lg shadow-sm flex items-center gap-1.5 border border-slate-100 dark:border-slate-700">
                   <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                   <span className="text-[10px] font-black text-slate-900 dark:text-white">{pkg.rating}</span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter truncate">{pkg.name}</h3>
                
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 uppercase text-[10px] font-black tracking-widest">
                    <Clock className="w-3 h-3" /> {pkg.duration}
                  </div>
                  <div className="w-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                  <div className="text-blue-600 dark:text-blue-400 text-xs font-black tracking-tight">
                    EST {pkg.price}
                  </div>
                </div>

                <div className="space-y-4 mb-8 md:mb-10">
                  {pkg.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-500 dark:text-slate-400 italic">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      {h}
                    </div>
                  ))}
                </div>

                <button className="w-full py-4 bg-slate-900 dark:bg-slate-800 text-white font-black rounded-2xl hover:bg-black dark:hover:bg-blue-600 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-sm border border-transparent dark:border-slate-700">
                  View Full Report <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 md:py-32 bg-slate-50 dark:bg-slate-900/50 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-800">
             <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-slate-100 dark:border-slate-700 shadow-sm">
                <Package className="w-10 h-10 text-slate-300 dark:text-slate-600" />
             </div>
             <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Inventory Exhausted</h3>
             <p className="text-slate-500 dark:text-slate-400 font-medium mt-3 px-4">No matches found for your current search parameters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
