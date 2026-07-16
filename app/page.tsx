'use client';

import { useState } from 'react';
import { Send, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

export default function RollingRover() {
  const [formData, setFormData] = useState({ name: '', email: '', projectType: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Gallery state
  const clientSites = [
    { name: 'Diza Travels', url: 'https://www.dizatravels.co.za' },
//    { name: 'ZAtours', url: 'https://www.zatours.co.za' },
//    { name: 'eThlathini Rest Camp', url: 'https://www.ethlathini.co.za' },
    { name: 'Mzamos Cultural Village and Homestead', url: 'https://www.mzamovillagehomestead.co.za' },
    { name: 'Diza Kwa-Smolo Community Upliftign Initiative', url: 'https://www.dizakwasmolo.co.za' },
//    { name: 'OpDesk - Tourism Operators Desk', url: 'https://www.opdesk.app' },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? clientSites.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev === clientSites.length - 1 ? 0 : prev + 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', projectType: '', message: '' });
      } else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <div className="min-h-[100vh] flex items-center justify-center relative" style={{ backgroundImage: "url('/hero.png')" }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="font-orbitron text-6xl md:text-8xl font-extrabold mb-6 text-white drop-shadow-lg">
            RollingRover
          </h1>
          <span className="inline-block px-8 py-2 bg-gradient-to-r from-amber-500 to-orange-600 
                           text-black font-bold tracking-widest rounded-full uppercase shadow-[0_0_15px_rgba(255,180,50,0.8)]">
            Productions
          </span>
          <p className="mt-10 text-xl md:text-2xl font-light uppercase tracking-[0.25em] 
                        border-t border-amber-700 pt-6 bg-clip-text text-transparent 
                        bg-gradient-to-r from-amber-400 via-orange-500 to-red-700 
                        animate-gradient-x">
            Websites • Apps • dApps — Built for Tomorrow
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-amber-400 animate-bounce text-4xl">↓</div>
      </div>

      {/* Gallery Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-orbitron text-3xl font-bold mb-8 text-center">Client Showcase</h2>
        <div className="relative bg-zinc-900 rounded-2xl overflow-hidden shadow-xl">
          <iframe
            src={clientSites[currentIndex].url}
            title={clientSites[currentIndex].name}
            className="w-full h-[600px] border-0"
          />
          {/* Controls */}
          <button onClick={handlePrev} className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70">
            <ChevronLeft className="w-6 h-6 text-amber-400" />
          </button>
          <button onClick={handleNext} className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70">
            <ChevronRight className="w-6 h-6 text-amber-400" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-zinc-400 font-inter">
            {clientSites[currentIndex].name}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto px-6 py-24" id="contact">
        <div className="text-center mb-12">
          <h2 className="font-orbitron text-4xl font-bold mb-4">Let’s Build Together</h2>
          <p className="text-lg text-zinc-400 font-inter">Share your vision and let’s make it real</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-900/80 backdrop-blur-xl p-10 rounded-2xl border border-amber-900/50 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-amber-200 mb-2 font-inter">Your Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-950 border border-amber-700 rounded-xl px-4 py-3 focus:border-amber-400 font-inter" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-200 mb-2 font-inter">Email Address</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-zinc-950 border border-amber-700 rounded-xl px-4 py-3 focus:border-amber-400 font-inter" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-200 mb-2 font-inter">Project Type</label>
            <select value={formData.projectType} onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full bg-zinc-950 border border-amber-700 rounded-xl px-4 py-3 focus:border-amber-400 font-inter" required>
              <option value="">Select...</option>
              <option value="website">New Website</option>
              <option value="redesign">Website Redesign</option>
              <option value="community">Community / Tourism Project</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-200 mb-2 font-inter">Message</label>
            <textarea rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-zinc-950 border border-amber-700 rounded-xl px-4 py-3 focus:border-amber-400 font-inter resize-y"
              placeholder="Describe your vision, goals, and timeline..." required />
          </div>

          <button type="submit" disabled={status === 'loading'}
            className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:opacity-70 font-bold uppercase rounded-xl text-lg flex items-center justify-center gap-2 shadow-lg transition-all font-inter">
            {status === 'loading' ? 'Sending...' : 'Send Design Brief'}
            <Send className="w-5 h-5" />
          </button>

          {status === 'success' && <p className="text-green-400 text-center font-inter">Thanks! I’ll get back to you within 48 hours.</p>}
          {status === 'error' && <p className="text-red-400 text-center font-inter">Something went wrong. Please try again.</p>}
        </form>

        <div className="flex justify-center gap-8 mt-12 text-sm text-zinc-500 font-inter">
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Hluhluwe, KZN</div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> Response within 48hrs</div>
        </div>
      </div>
    </div>
  );
}
