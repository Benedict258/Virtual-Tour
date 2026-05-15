import { Play, Clock, MapPin, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onWatch: () => void;
}

export default function Hero({ onWatch }: HeroProps) {
  return (
    <section className="relative min-h-[520px] flex flex-col items-center justify-center text-center text-white px-4 py-24 overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.6) 100%), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80')" 
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
          Latest Release
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          The Great Lagos<br/>Market Dive
        </h1>

        <p className="max-w-xl mx-auto text-base md:text-lg text-white/80 mb-10">
          Immerse yourself in the vibrant colors, sounds, and rhythms of Lagos' biggest open-air market. A complete cultural experience ready to watch anytime.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            onClick={onWatch}
            className="bg-coral hover:bg-coral/90 text-white flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-coral/20"
          >
            <Play className="w-5 h-5 fill-current" />
            Watch Now
          </button>
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all">
            Tour Details
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>45 mins</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Lagos, Nigeria</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>124k views</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
