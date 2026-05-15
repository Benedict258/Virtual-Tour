import { PlayCircle, Info, Users, MapPin, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onWatch: () => void;
}

export default function Hero({ onWatch }: HeroProps) {
  return (
    <section className="relative w-full h-[calc(100vh-100px)] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url('https://storage.googleapis.com/banani-generated-images/generated-images/eab842f3-072b-4d98-a899-55034e9f249b.jpg')" 
        }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[1]" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center p-6 md:p-12 max-w-4xl mx-auto space-y-8"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] drop-shadow-2xl">
          Lekki Conservation Centre: The Canopy Walk
        </h1>

        <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed drop-shadow-md">
          Join thousands of viewers on an immersive virtual journey through Africa's longest canopy walkway. Experience nature live from Lagos.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
          <button 
            onClick={onWatch}
            className="w-full sm:w-auto bg-coral text-white font-bold text-lg px-10 py-5 rounded-full shadow-2xl shadow-coral/30 hover:bg-coral/90 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group"
          >
            <PlayCircle className="size-[26px] group-hover:scale-110 transition-transform" />
            <span>Join Live Tour</span>
          </button>
          
          <button className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-lg px-10 py-5 rounded-full shadow-xl hover:bg-white/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
            <Info className="size-[26px]" />
            <span>Learn More</span>
          </button>
        </div>

        <div className="flex items-center gap-10 mt-10 pt-10 border-t border-white/20 text-white/80 text-sm font-semibold tracking-wide">
          <div className="flex items-center gap-2">
            <Users className="size-[20px] text-coral" />
            <span>1,245 watching</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-[20px] text-coral" />
            <span>Lagos, Nigeria</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="size-[20px] text-coral" />
            <span>Free Event</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
