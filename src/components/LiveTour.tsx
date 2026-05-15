import { Users, Pin, Send, Heart, Volume2, Pause, Settings, Maximize } from 'lucide-react';
import { CHAT } from '../constants';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function LiveTour() {
  return (
    <section id="live" className="px-4 md:px-8 py-8">
      {/* Live Indicator Bar */}
      <div className="bg-teal rounded-t-2xl px-6 py-3 text-white text-xs md:text-sm font-semibold flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        Born From This Ground is Live! Join the tour now.
      </div>

      <div className="rounded-b-2xl overflow-hidden border border-gray-100 shadow-xl flex flex-col lg:flex-row bg-white">
        {/* Visual Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Main "Player" */}
          <div className="relative aspect-video bg-black overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1515939469765-4b5f25ee6e53?w=1200&q=80" 
              alt="Live Tour" 
              className="w-full h-full object-cover opacity-80"
            />
            
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-coral text-white text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Live Now
              </span>
              <span className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[10px] font-medium">
                Lagos, Nigeria
              </span>
            </div>

            <div className="absolute top-4 right-4">
              <span className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[10px] font-medium flex items-center gap-2">
                <Users className="w-3 h-3" />
                1.2k watching
              </span>
            </div>

            {/* Host Overlay */}
            <div className="absolute bottom-16 right-4 w-32 md:w-48 aspect-video rounded-lg overflow-hidden border-2 border-white/30 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1558618047-f4e60cefab14?w=600&q=80" 
                alt="Host" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-coral text-white text-[8px] px-1.5 py-0.5 rounded uppercase font-bold">Host</div>
            </div>

            <div className="absolute bottom-4 left-4 max-w-[70%]">
              <h3 className="text-white font-display text-lg md:text-2xl font-bold drop-shadow-lg">
                Lekki Conservation Centre: The Canopy Walk
              </h3>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              {[Pause, Volume2, Settings, Maximize].map((Icon, i) => (
                <button key={i} className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-display font-bold">Lekki Conservation Centre: The Canopy Walk</h2>
                <div className="flex flex-wrap gap-4 text-xs md:text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-teal">📅</span> Oct 24, 2024
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-teal">⏰</span> 10:00 AM – 12:00 PM (WAT)
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl">
                  Join us on an immersive virtual journey through one of Africa's most prominent urban nature parks. Experience the thrill of walking on the longest canopy walkway in Africa while discovering unique flora and fauna.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Nature", "Guided Tour", "Interactive"].map(t => (
                    <span key={t} className="px-3 py-1 text-[10px] md:text-xs font-semibold rounded-full border border-gray-200 text-gray-500 hover:border-teal hover:text-teal transition-colors cursor-default">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Sponsor Card */}
                <div className="mt-6 flex items-center gap-4 p-4 rounded-2xl border border-teal/10 bg-teal/[0.02] group hover:bg-teal/[0.04] transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    ✈️
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-teal/60 uppercase tracking-widest">Sponsored: FlyAir Nigeria</span>
                    <p className="text-gray-600 font-medium text-xs md:text-sm">Get 20% off flights to Lagos this weekend.</p>
                  </div>
                  <button className="text-xs font-bold px-4 py-2 rounded-full border border-gray-300 hover:bg-white hover:border-teal hover:text-teal transition-all">
                    Claim Offer
                  </button>
                </div>
              </div>

              <button className="bg-teal hover:bg-teal/90 text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-teal/20 transition-all whitespace-nowrap self-start">
                Donate to Host
              </button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-gray-100 flex flex-col h-[500px] lg:h-auto bg-gray-50/30">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white/50 backdrop-blur-sm">
            <h4 className="font-bold text-sm flex items-center gap-2">
              Live Chat
              <span className="w-2 h-2 rounded-full bg-green-500" />
            </h4>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Story Pot
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {CHAT.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "p-3 rounded-2xl text-sm relative group",
                  msg.pinned ? "bg-dark text-white shadow-lg" : "bg-white border border-gray-100 shadow-sm"
                )}
              >
                {msg.pinned && (
                  <div className="absolute -top-2 -right-2 bg-coral p-1 rounded-full text-white">
                    <Pin className="w-3 h-3" />
                  </div>
                )}
                <div className="flex items-center justify-between mb-1">
                  <span className={cn("font-bold text-xs", msg.pinned ? "text-coral" : "text-teal")}>
                    {msg.user}
                  </span>
                  <span className="text-[10px] opacity-50 font-medium">{msg.time}</span>
                </div>
                <p className={cn("leading-relaxed", msg.pinned ? "text-gray-100" : "text-gray-600")}>
                  {msg.msg}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative group">
              <input 
                type="text"
                placeholder="Share your thoughts..."
                className="w-full bg-gray-100 pl-4 pr-20 py-3 rounded-full text-sm border-2 border-transparent focus:outline-none focus:border-teal/20 focus:bg-white transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button className="p-1.5 text-gray-400 hover:text-coral transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-1.5 bg-coral text-white rounded-full shadow-md shadow-coral/20 hover:scale-110 active:scale-95 transition-all">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
