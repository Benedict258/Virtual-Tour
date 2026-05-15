import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecommendationSection from './components/RecommendationSection';
import Newsletter from './components/Newsletter';
import LiveTour from './components/LiveTour';
import Catalog from './components/Catalog';
import Footer from './components/Footer';
import BecomeHostModal from './components/BecomeHostModal';

export default function App() {
  const [isBecomeHostOpen, setIsBecomeHostOpen] = useState(false);

  const scrollWithOffset = (elId: string) => {
    const element = document.getElementById(elId);
    if (element) {
      const yOffset = -80; // Navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-cream selection:bg-teal/20 selection:text-teal font-sans">
      <Navbar onBecomeHost={() => setIsBecomeHostOpen(true)} />
      
      <main>
        <Hero 
          onWatch={() => scrollWithOffset('live')} 
        />
        
        <RecommendationSection />
        
        <Newsletter />
        
        <LiveTour />
        
        <Catalog />
      </main>

      <Footer />

      <BecomeHostModal 
        isOpen={isBecomeHostOpen} 
        onClose={() => setIsBecomeHostOpen(false)} 
      />
    </div>
  );
}
