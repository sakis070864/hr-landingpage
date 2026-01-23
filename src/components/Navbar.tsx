import React from 'react';
import { Briefcase } from 'lucide-react';

const Navbar: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-night/80 backdrop-blur-2xl border-b border-purple-100/50 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-purple-600 p-2 rounded-xl shadow-lg shadow-purple-600/20 group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl tracking-tighter text-slate-900 text-white italic">HR-Trainer</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10 text-[13px] font-bold text-slate-500">
            <a 
              href="#benefits" 
              onClick={(e) => scrollToSection(e, 'benefits')}
              className="hover:text-purple-600 dark:hover:text-white transition-all cursor-pointer"
            >
              Benefits
            </a>
            <a 
              href="#how-it-works" 
              onClick={(e) => scrollToSection(e, 'how-it-works')}
              className="hover:text-purple-600 dark:hover:text-white transition-all cursor-pointer"
            >
              How it works
            </a>
          </div>

          <div className="flex items-center">
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-purple-600 dark:hover:bg-purple-600 dark:hover:text-white rounded-xl text-xs font-bold transition-all shadow-xl dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)] cursor-pointer"
            >
              Request Access
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;