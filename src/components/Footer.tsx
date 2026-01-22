
import React, { useState } from 'react';
import { Briefcase, Linkedin, Copy, Check } from 'lucide-react';

const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = "mastorematas@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-white dark:bg-black text-slate-500 pt-32 pb-12 border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24 items-start">
          
          {/* Logo & Info Section */}
          <div className="md:col-span-5 space-y-8">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 dark:bg-white/5 p-2 rounded-xl border border-slate-200 dark:border-white/10">
                <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-500" />
              </div>
              <span className="font-black text-xl tracking-tighter text-slate-900 dark:text-white italic">HR-Trainer</span>
            </div>
            
            <p className="text-sm leading-relaxed max-w-sm font-bold text-slate-600 dark:text-slate-500 tracking-tight">
              The smartest way to practice for your next job. We find real interview questions from your city so you can be 100% prepared.
            </p>

            <div className="pt-4">
              <span className="text-[11px] font-bold text-slate-900 dark:text-white tracking-widest uppercase">Created by A. Athanasopoulos</span>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="md:col-span-4 space-y-8">
            <h4 className="text-slate-400 dark:text-white font-bold text-[11px] tracking-[0.2em] uppercase">Contact Us</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-3 group">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 tracking-tight">
                  {email}
                </span>
                <button 
                  onClick={copyToClipboard}
                  className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10"
                  title="Copy email"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />}
                </button>
              </div>
              
              <a 
                href="https://www.linkedin.com/in/sakis-athan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-bold text-slate-500 dark:text-slate-500 hover:text-purple-600 dark:hover:text-white transition-colors tracking-tight group"
              >
                <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-500 group-hover:scale-110 transition-transform" />
                Linkedin Profile
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-slate-400 dark:text-white font-bold text-[11px] tracking-[0.2em] uppercase">Quick Links</h4>
            <ul className="space-y-5 text-[13px] font-bold tracking-tight">
              <li>
                <a href="#benefits" className="text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Benefits</a>
              </li>
              <li>
                <a href="#how-it-works" className="text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">How it works</a>
              </li>
              <li>
                <a href="#contact" className="text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Join</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-200 dark:border-white/5 text-center">
          <p className="text-[10px] font-bold tracking-[0.3em] text-slate-400 dark:text-slate-800 uppercase">
            © {new Date().getFullYear()} HR-Trainer • Practice to get hired
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
