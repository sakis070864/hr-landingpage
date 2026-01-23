
import React from 'react';
import { Cpu, Globe, Mic2, MessageSquare, Mic } from 'lucide-react';

const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="py-20 md:py-32 bg-night overflow-hidden scroll-mt-20 transition-colors duration-500 relative">
      <div className="absolute top-0 right-0 p-32 opacity-10 blur-3xl bg-purple-200 dark:bg-purple-900/10 rounded-full w-96 h-96 -z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* New Vocal Interview Highlight Section */}
        <div className="mb-32 p-8 md:p-16 rounded-[4rem] bg-white/[0.02] border border-purple-100 dark:border-white/5 premium-shadow-light dark:shadow-none relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors duration-700"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-purple-600 flex items-center justify-center shadow-2xl shadow-purple-600/40 shrink-0">
              <Mic className="w-12 h-12 md:w-16 md:h-16 text-white animate-pulse" />
            </div>
            
            <div className="text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest">
                Real-Time Experience
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white italic tracking-tighter">
                True Vocal Interview.
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                Just like in a real office. The AI speaks to you, asks tough questions, and <span className="text-purple-600 dark:text-purple-400 font-bold italic">waits for your spoken answer.</span> Practice your tone, your pace, and your confidence with voice-to-voice simulation.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-12">
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-black text-purple-600 dark:text-purple-500 mb-4 tracking-widest uppercase italic">The Engine</h2>
              <h3 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white italic tracking-tighter leading-[1.1]">
                Real-world <br />
                <span className="gradient-text">Intelligence.</span>
              </h3>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-2xl font-medium tracking-tight leading-relaxed max-w-2xl mx-auto">
              HR-Trainer performs a <span className="text-slate-900 dark:text-white font-bold underline decoration-purple-400 decoration-2 underline-offset-4">deep web search</span> to identify the actual questions asked by HR departments in your specific city.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {/* Gemini 3 Flash Card */}
            <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-purple-100 dark:border-white/5 hover:border-purple-400 transition-all text-left group premium-shadow-light dark:shadow-none hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Cpu className="w-8 h-8 text-purple-600 dark:text-purple-500" />
              </div>
              <div className="space-y-4">
                <h4 className="text-slate-900 dark:text-white font-black italic tracking-tighter text-3xl leading-none">Gemini 3 Flash</h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed tracking-tight">
                  State-of-the-art neural architecture for low-latency voice interaction and high-speed data processing.
                </p>
              </div>
            </div>

            {/* Neural Grounding Card */}
            <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-purple-100 dark:border-white/5 hover:border-indigo-400 transition-all text-left group premium-shadow-light dark:shadow-none hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-indigo-600 dark:text-indigo-500" />
              </div>
              <div className="space-y-4">
                <h4 className="text-slate-900 dark:text-white font-black italic tracking-tighter text-3xl leading-none">Neural Grounding</h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed tracking-tight">
                  Real-time synchronization with local hiring markets to pull verified interview patterns from specific regions.
                </p>
              </div>
            </div>

            {/* Gemini 2.5 Multimodal Card */}
            <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-purple-100 dark:border-white/5 hover:border-fuchsia-400 transition-all text-left group premium-shadow-light dark:shadow-none hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl bg-fuchsia-50 dark:bg-fuchsia-500/10 border border-fuchsia-100 dark:border-fuchsia-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Mic2 className="w-8 h-8 text-fuchsia-600 dark:text-fuchsia-500" />
              </div>
              <div className="space-y-4">
                <h4 className="text-slate-900 dark:text-white font-black italic tracking-tighter text-3xl leading-none">Gemini 2.5 Multimodal</h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed tracking-tight">
                  Advanced multimodal capabilities for seamless, human-like voice-to-voice live conversation simulation.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Benefits;
