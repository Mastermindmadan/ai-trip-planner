import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Compass, 
  Map as MapIcon, 
  Hotel, 
  Utensils, 
  Car, 
  CheckCircle,
  ArrowRight,
  Globe
} from 'lucide-react';

export default function Landing() {
  const features = [
    { icon: Compass, title: 'AI Itinerary', desc: 'Personalized day-by-day plans crafted by intelligent algorithms.' },
    { icon: Hotel, title: 'Luxury Stays', desc: 'Handpicked hotel recommendations from budget to premium luxury.' },
    { icon: Utensils, title: 'Local Cuisine', desc: 'Discover hidden culinary gems and popular dining spots.' },
    { icon: Car, title: 'Easy Transport', desc: 'Seamlessly find the best ways to get around your destination.' },
    { icon: MapIcon, title: 'Interactive Maps', desc: 'Visualize your entire journey with our integrated mapping tool.' },
    { icon: CheckCircle, title: 'History & Saves', desc: 'Keep track of all your planned adventures in one place.' },
  ];

  return (
    <div className="overflow-hidden bg-white dark:bg-slate-950 px-4 md:px-0 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-blue-100 dark:border-blue-800">
               Next-Generation Travel
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tighter italic">
              The Intelligent Way <br className="hidden md:block" />
              to <span className="text-blue-600 dark:text-blue-400">Travel.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Experience the world with AI-powered precision. We automate the complexity of planning so you can focus on the adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.div
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    to="/register"
                    className="block w-full sm:w-auto px-10 py-4 bg-slate-900 dark:bg-blue-600 border-2 border-slate-900 dark:border-blue-600 text-white rounded-xl font-bold text-base hover:bg-transparent dark:hover:bg-transparent hover:text-slate-900 dark:hover:text-blue-400 transition-all shadow-xl shadow-slate-200 dark:shadow-blue-900/10 text-center"
                  >
                    Plan Your Journey
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    to="/packages"
                    className="block w-full sm:w-auto px-10 py-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-base hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm text-center"
                  >
                    Explore Packages
                  </Link>
                </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
                <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">120K+</p>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Trips Planned</p>
            </div>
            <div className="text-center">
                <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">240+</p>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Countries</p>
            </div>
            <div className="text-center">
                <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">18.5M</p>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Miles Scanned</p>
            </div>
            <div className="text-center">
                <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">4.92</p>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Avg Rating</p>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {features.slice(0, 3).map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 md:p-10 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-slate-100 dark:hover:shadow-blue-900/10 transition-all group"
            >
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-12 h-12 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white mb-8 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all"
              >
                <feature.icon className="w-6 h-6" />
              </motion.div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <Globe className="w-[800px] h-[800px] text-white absolute -bottom-1/2 -right-1/4" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">Ready to see the world differently?</h2>
            <p className="text-slate-400 text-lg mb-12 font-medium">Join thousands of travelers who have switched to SmartTrip AI.</p>
            <Link
              to="/register"
              className="inline-flex items-center gap-3 px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all active:scale-95"
            >
              Get Started Now <ArrowRight className="w-6 h-6" />
            </Link>
        </div>
      </section>
    </div>
  );
}
