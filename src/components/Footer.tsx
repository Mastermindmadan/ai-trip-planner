import React from 'react';
import { Mail, Github, Twitter, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <MapPin className="text-white w-4 h-4" />
            </div>
            <span className="text-xl font-display font-bold text-white">SmartTrip AI</span>
          </div>
          <p className="text-sm leading-relaxed">
            Revolutionizing travel planning with AI-powered itineraries, personalized recommendations, and seamless organization.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-500 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Our Packages</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Safety Guide</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Destinations</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-500 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Contact Support</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110">
              <Mail className="w-5 h-5" />
            </a>
          </div>
          <p className="text-xs">
            Subscribe to our newsletter for exclusive travel deals.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs">
        © {new Date().getFullYear()} SmartTrip AI. All rights reserved. 
      </div>
    </footer>
  );
}
