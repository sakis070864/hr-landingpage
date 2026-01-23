
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Video, Target, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>('/video.mp4');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log("Autoplay waiting for interaction.");
      });
    }
  }, [videoSrc]);

  return (
    <section className="relative pt-32 pb-12 md:pt-48 md:pb-16 overflow-hidden bg-night transition-colors duration-500">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40 dark:opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-purple-100 dark:bg-purple-900/30 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-purple-100 dark:border-white/10 text-[11px] font-bold text-purple-600 dark:text-purple-400 mb-8 tracking-wide premium-shadow-light dark:shadow-none">
            <Sparkles className="w-3 h-3 text-purple-500 animate-pulse" />
            Guaranteed Interview Success
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-[1] italic">
            Pass your job interview <br />
            <span className="gradient-text">easily & confidently.</span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 font-medium leading-relaxed tracking-tight">
            If you master the <span className="text-purple-600 dark:text-purple-400 font-bold">60-80 specific questions</span> asked by companies in the last 12 months, you will successfully pass your interview. Our AI uses <span className="underline decoration-purple-300 decoration-2 underline-offset-4 font-bold">Neural Grounding</span> to find exactly what they are asking right now.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-12 relative group">
          <input
            type="file"
            accept="video/mp4"
            className="hidden"
            ref={fileInputRef}
            onChange={handleVideoUpload}
          />

          <div className="p-1.5 bg-white/10 rounded-[3rem] premium-shadow-light dark:premium-shadow-dark overflow-hidden border border-purple-100 dark:border-white/5 transition-all duration-500">
            <div className="bg-night rounded-[2.8rem] overflow-hidden relative">
              <div className="flex items-center justify-between p-6 bg-purple-50/50 dark:bg-black/60 border-b border-purple-100/50 dark:border-white/5 backdrop-blur-md z-30">
                <div className="flex items-center gap-6">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-purple-200 dark:bg-white/10"></div>
                    <div className="w-3 h-3 rounded-full bg-purple-100 dark:bg-white/10"></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase">Live Coaching Mode</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
                  <span className="text-[9px] font-bold text-purple-600 dark:text-purple-500 tracking-widest uppercase">Active Simulation</span>
                </div>
              </div>

              <div className="relative aspect-video w-full bg-slate-50 dark:bg-[#030303] flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  src={videoSrc || ''}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoSrc ? 'opacity-100' : 'opacity-0'}`}
                  onError={() => { if (videoSrc === '/video.mp4') setVideoSrc(null); }}
                />

                {!videoSrc && (
                  <div className="flex flex-col items-center gap-6 text-center p-12 z-20">
                    <div className="w-20 h-20 rounded-3xl bg-white/5 border border-purple-100 dark:border-white/10 flex items-center justify-center">
                      <Video className="w-8 h-8 text-purple-300 dark:text-white/20" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-slate-900 dark:text-white font-black text-xl italic tracking-tighter">Your Simulation Video</h3>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-8 py-4 bg-purple-600 text-white font-black rounded-xl hover:bg-purple-700 transition-all italic tracking-tighter text-sm shadow-xl shadow-purple-600/20"
                      >
                        Upload Video
                      </button>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-8 left-8 z-20">
                  <div className="px-5 py-2.5 bg-white/90 dark:bg-black/60 backdrop-blur-lg rounded-xl border border-purple-100 dark:border-white/10 flex items-center gap-3 premium-shadow-light dark:shadow-none">
                    <Target className="w-4 h-4 text-purple-600 dark:text-purple-500" />
                    <span className="text-[10px] font-black text-slate-900 dark:text-white tracking-widest italic uppercase">Live Voice Interaction</span>
                  </div>
                </div>
              </div>

              <div className="p-10 border-t border-purple-50/50 dark:border-white/5 bg-night flex flex-col items-center gap-4 relative z-30">
                <button
                  onClick={scrollToContact}
                  className="w-full max-w-sm px-10 py-5 bg-purple-600 text-white font-black rounded-2xl shadow-2xl shadow-purple-600/30 hover:bg-purple-700 dark:hover:bg-purple-500 transition-all italic tracking-tighter text-center transform hover:scale-[1.02]"
                >
                  Start practicing now
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[10px] font-bold text-slate-400 dark:text-slate-600 hover:text-purple-600 dark:hover:text-white transition-colors uppercase tracking-widest"
                >
                  Change demo video
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 opacity-40 animate-bounce cursor-pointer group mb-4" onClick={(e) => {
          const el = document.getElementById('benefits');
          if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
        }}>
          <span className="text-[11px] font-black tracking-[0.3em] text-slate-900 dark:text-white uppercase group-hover:text-purple-600 transition-colors">Explore Intelligence</span>
          <ChevronDown className="w-5 h-5 text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
