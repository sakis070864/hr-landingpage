
import React, { useState } from 'react';
import { ArrowRight, User, AtSign, Briefcase } from 'lucide-react';

const CTA: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '' });
      } else {
        const errorData = await response.json();
        console.error("SERVER ERROR DETAILS:", errorData);
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 bg-accent-light dark:bg-black overflow-hidden scroll-mt-20 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="bg-white dark:bg-white/[0.02] border border-purple-100 dark:border-white/5 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden premium-shadow-light dark:shadow-none">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 p-16 opacity-5 dark:opacity-5">
            <Briefcase className="w-48 h-48 text-purple-600 dark:text-white transform rotate-12" />
          </div>

          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter italic">
              Ready to <br />
              <span className="gradient-text">Dominate.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl mb-12 max-w-md mx-auto font-medium leading-relaxed tracking-tight">
              Practice makes permanent. Get your unique training link and start your first simulation.
            </p>

            <form onSubmit={handleRequest} className="flex flex-col items-center gap-6 max-w-sm mx-auto">
              <div className="w-full space-y-4">
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300 dark:text-slate-600" />
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-purple-50/30 dark:bg-white/5 border border-purple-100 dark:border-white/10 rounded-2xl py-5 pl-14 pr-8 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700 font-bold focus:border-purple-500 outline-none transition-all tracking-tight text-sm shadow-inner"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <AtSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300 dark:text-slate-600" />
                  <input
                    required
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-purple-50/30 dark:bg-white/5 border border-purple-100 dark:border-white/10 rounded-2xl py-5 pl-14 pr-8 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700 font-bold focus:border-purple-500 outline-none transition-all tracking-tight text-sm shadow-inner"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-black font-black text-xl rounded-2xl hover:bg-purple-600 dark:hover:bg-purple-600 dark:hover:text-white transition-all flex items-center justify-center gap-4 group italic tracking-tighter shadow-2xl shadow-slate-900/20 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Request Sent!' : 'Send Request'}
                {status === 'idle' && <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />}
              </button>

              {status === 'error' && <p className="text-red-500 font-bold">Something went wrong. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
