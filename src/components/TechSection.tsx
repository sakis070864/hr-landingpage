
import React from 'react';
import { Mail, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-32 bg-day dark:bg-[#050505] scroll-mt-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-sm font-black text-purple-400 dark:text-slate-600 mb-4 italic tracking-[0.3em] uppercase">The Protocol</h2>
          <p className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white italic tracking-tighter">How to start.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          
          <div className="bg-white dark:bg-white/[0.02] border border-purple-100 dark:border-white/5 p-12 rounded-[3.5rem] premium-shadow-light dark:shadow-none hover:border-purple-500/30 transition-all group hover:-translate-y-2">
            <div className="w-16 h-16 bg-purple-600 text-white rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-purple-600/30 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 italic tracking-tighter">1. Request link</h3>
            <p className="text-slate-600 dark:text-slate-500 text-sm leading-relaxed font-medium tracking-tight">
              Email <span className="text-purple-600 dark:text-purple-400 font-black">mastorematas@gmail.com</span>. You will receive a unique, encrypted training link within 2-3 hours.
            </p>
          </div>
          
          <div className="bg-white dark:bg-white/[0.02] border border-purple-100 dark:border-white/5 p-12 rounded-[3.5rem] premium-shadow-light dark:shadow-none hover:border-purple-500/30 transition-all group hover:-translate-y-2">
            <div className="w-16 h-16 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-xl">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 italic tracking-tighter">2. Choose Focus</h3>
            <p className="text-slate-600 dark:text-slate-500 text-sm leading-relaxed font-medium tracking-tight">
              Your link is configured for one specific profession and city. Train as much as you want to reach 100% confidence.
            </p>
          </div>

          <div className="bg-white dark:bg-white/[0.02] border border-purple-100 dark:border-white/5 p-12 rounded-[3.5rem] premium-shadow-light dark:shadow-none hover:border-indigo-500/30 transition-all group hover:-translate-y-2">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-indigo-600/30 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 italic tracking-tighter">3. Stay Active</h3>
            <p className="text-slate-600 dark:text-slate-500 text-sm leading-relaxed font-medium tracking-tight">
              Keep your session active to maintain the HR data connection. Closing your tab may terminate the instance.
            </p>
          </div>
        </div>

        <div className="mt-20 p-10 rounded-[2.5rem] bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-500/20 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left premium-shadow-light dark:shadow-none">
           <div className="w-16 h-16 rounded-full bg-white dark:bg-black/40 flex items-center justify-center shadow-lg">
             <CheckCircle2 className="w-10 h-10 text-purple-600 dark:text-purple-500" />
           </div>
           <p className="text-sm font-bold text-purple-700 dark:text-purple-300 uppercase tracking-widest leading-relaxed max-w-xl">
             Every simulation is powered by live market data. No outdated questions. Ever.
           </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
