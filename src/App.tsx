
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Benefits from './components/Features';
import HowItWorks from './components/TechSection';
import CTA from './components/CTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-night selection:bg-purple-500/30 selection:text-white transition-colors duration-500">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main className="flex-grow">
        <Hero />
        <Benefits />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;
