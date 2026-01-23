import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Benefits from './components/Features';
import HowItWorks from './components/TechSection';
import CTA from './components/CTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  // Ensure dark mode is always applied initially
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-night selection:bg-purple-500/30 selection:text-white transition-colors duration-500">
      <Navbar />
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