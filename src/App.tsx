import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecommendationSection from './components/RecommendationSection';
import Newsletter from './components/Newsletter';
import LiveTour from './components/LiveTour';
import Catalog from './components/Catalog';
import Footer from './components/Footer';
import BecomeHostModal from './components/BecomeHostModal';
import WelcomeModal from './components/WelcomeModal';

export default function App() {
  const [isBecomeHostOpen, setIsBecomeHostOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'live'>('home');

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        setIsWelcomeModalOpen(true);
        sessionStorage.setItem('hasSeenWelcome', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const navigateTo = (view: 'home' | 'live') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white selection:bg-coral/20 selection:text-coral font-sans">
      <Navbar 
        onBecomeHost={() => setIsBecomeHostOpen(true)} 
        onLogoClick={() => navigateTo('home')}
        onLiveClick={() => navigateTo('live')}
      />
      
      {/* Spacer for fixed navbar: top banner + navbar height */}
      <div className="pt-[96px] md:pt-[101px]">
        <main>
          {currentView === 'home' ? (
            <>
              <Hero 
                onWatch={() => navigateTo('live')} 
              />
              <Newsletter />
              <RecommendationSection />
              <Catalog />
            </>
          ) : (
            <LiveTour />
          )}
        </main>
      </div>

      <Footer />

      <BecomeHostModal 
        isOpen={isBecomeHostOpen} 
        onClose={() => setIsBecomeHostOpen(false)} 
      />

      <WelcomeModal 
        isOpen={isWelcomeModalOpen} 
        onClose={() => setIsWelcomeModalOpen(false)} 
      />
    </div>
  );
}
