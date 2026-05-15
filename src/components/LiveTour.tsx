import { Users, Pin, Send, Heart, Volume2, Pause, Settings, Maximize, Share2, Bell, Clock, Info } from 'lucide-react';
import { CHAT } from '../constants';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface UpcomingTour {
  id: number;
  title: string;
  time: string;
  host: string;
  tags: string[];
  img: string;
}

const UPCOMING_TOURS: UpcomingTour[] = [
  { 
    id: 1, 
    title: "Badagry Heritage Trail Live", 
    time: "Tomorrow, 2:00 PM (WAT)", 
    host: "Amina", 
    tags: ["History", "Culture"],
    img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80"
  },
  { 
    id: 2, 
    title: "Balogun Market Hustle", 
    time: "Friday, 10:00 AM (WAT)", 
    host: "Tolu", 
    tags: ["Market", "Street"],
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
  },
  { 
    id: 3, 
    title: "Victoria Island Night Walk", 
    time: "Saturday, 8:00 PM (WAT)", 
    host: "David", 
    tags: ["Nightlife", "City"],
    img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80"
  }
];

export default function LiveTour() {
  return (
    <div className="bg-white">
      {/* Main Live Interface */}
      <section id="live" className="px-4 md:px-8 py-4 md:py-8 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Player Area */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            {/* Main Player Container */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl group ring-1 ring-white/10">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80" 
                alt="Market Scene" 
                className="w-full h-full object-cover opacity-90"
              />
              
              {/* Overlays */}
              <div className="absolute top-3 left-3 md:top-4 md:left-4 flex gap-2 flex-wrap">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-coral text-white text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-lg">
                  LIVE NOW
                </span>
                <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-[4px] text-white text-[10px] md:text-xs font-bold shadow-lg border border-white/10">
                  Lagos, Nigeria
                </span>
              </div>

              <div className="absolute top-3 right-3 md:top-4 md:right-4 flex gap-2">
                <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-[4px] text-white text-[10px] md:text-xs font-bold flex items-center gap-1.5 shadow-lg border border-white/10">
                  <Users className="size-3 md:size-4" />
                  1.2k
                </span>
                <button className="bg-black/40 backdrop-blur-md size-7 md:size-9 flex items-center justify-center rounded-full text-white hover:bg-black/60 transition-colors shadow-lg border border-white/10">
                  <Share2 className="size-3.5 md:size-4" />
                </button>
              </div>

              {/* Host Picture-in-Picture */}
              <div className="absolute bottom-16 right-4 md:bottom-20 md:right-8 w-24 md:w-48 aspect-video rounded-lg overflow-hidden border-2 border-white/20 shadow-2xl z-20">
                <img 
                  src="https://images.unsplash.com/photo-1558618047-f4e60cefab14?w=600&q=80" 
                  alt="Host" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 right-1 bg-coral text-white text-[8px] md:text-[10px] px-1.5 py-0.5 rounded uppercase font-bold">Host</div>
              </div>

              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 pr-32 md:pr-64">
                <h3 className="text-white font-bold text-sm md:text-2xl font-display drop-shadow-2xl leading-tight">
                  Lekki Conservation Centre: The Canopy Walk
                </h3>
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex items-center gap-3">
                <div className="hidden sm:flex gap-2 p-1.5 bg-black/30 backdrop-blur-md rounded-full border border-white/10">
                   <Pause className="size-3.5 text-white cursor-pointer" />
                   <div className="w-12 md:w-20 h-1 bg-white/20 rounded-full mt-1.5 relative overflow-hidden">
                     <div className="absolute inset-0 bg-white w-1/2" />
                   </div>
                </div>
                <div className="flex gap-2.5">
                  <Settings className="size-4 md:size-5 text-white opacity-80 hover:opacity-100 cursor-pointer drop-shadow-lg" />
                  <Maximize className="size-4 md:size-5 text-white opacity-80 hover:opacity-100 cursor-pointer drop-shadow-lg" />
                </div>
              </div>
            </div>

            {/* Info Under Player */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="bg-coral/10 text-coral text-[10px] font-bold px-3 py-1.5 rounded-md uppercase flex items-center gap-2 tracking-widest leading-none border border-coral/20">
                    <span className="size-1.5 rounded-full bg-coral animate-pulse" />
                    Currently Live
                  </span>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-dark font-display leading-tight">
                  Lekki Conservation Centre: The Canopy Walk
                </h1>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] md:text-xs text-muted-foreground font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2.5">
                    <div className="size-6 rounded-full bg-coral/10 flex items-center justify-center text-coral">
                      <Users className="size-3.5" />
                    </div>
                    <span>Hosted by: Chuka (Lagos Rhythm)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="size-6 rounded-full bg-coral/10 flex items-center justify-center text-coral">
                      <Clock className="size-3.5" />
                    </div>
                    <span>Started 45 mins ago</span>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl pt-2">
                  Join us on an immersive virtual journey through one of Africa's most prominent urban nature parks. Experience the thrill of walking on the longest canopy walkway in Africa while discovering unique flora and fauna.
                </p>
              </div>

              <button className="bg-teal hover:bg-teal/90 text-white px-10 py-4 rounded-full font-bold text-sm shadow-xl shadow-teal/20 transition-all active:scale-95 whitespace-nowrap self-start">
                Donate to Host
              </button>
            </div>
          </div>

          {/* Chat / Story Pot Area */}
          <aside className="w-full lg:w-[400px] flex flex-col h-[500px] lg:h-[calc(100vh-160px)] min-h-[450px] bg-white border border-border rounded-2xl shadow-sm overflow-hidden sticky top-[140px]">
            <div className="p-4 border-b border-border flex items-center justify-between bg-white/80 backdrop-blur-md">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-xs text-dark uppercase tracking-widest">Story Pot</span>
                <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1.5 uppercase opacity-70">
                  <Users className="size-3 text-coral" />
                  1,245 watching
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-muted rounded-full transition-colors">
                  <Info className="size-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-gray-50/10">
              {CHAT.map((msg, i) => (
                <div 
                  key={i}
                  className={cn(
                    "flex flex-col gap-1.5 rounded-xl transition-all",
                    msg.pinned ? "bg-[#1A1A1A] text-white shadow-xl p-4 relative" : "bg-white border border-border/60 shadow-sm p-3.5"
                  )}
                >
                  {msg.pinned && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-coral text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">
                      <Pin className="size-2.5" />
                      Pinned
                    </div>
                  )}
                  <div className="flex items-center justify-between pointer-events-none">
                    <span className={cn("font-bold text-[11px] tracking-wide", msg.pinned ? "text-coral" : "text-teal")}>
                      {msg.user}
                    </span>
                    <span className="text-[9px] opacity-40 font-medium">{msg.time}</span>
                  </div>
                  <p className={cn("text-xs leading-relaxed font-medium", msg.pinned ? "text-gray-200" : "text-dark/80")}>
                    {msg.msg}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-border">
              <div className="relative group">
                <input 
                  type="text"
                  placeholder="Share your thoughts..."
                  className="w-full bg-muted border border-border pl-5 pr-14 py-4 rounded-full text-sm font-semibold focus:outline-none focus:border-teal/40 focus:bg-white transition-all shadow-inner placeholder:text-gray-400"
                />
                <button className="absolute right-2.5 top-1/2 -translate-y-1/2 size-9 bg-coral text-white rounded-full shadow-lg shadow-coral/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                  <Send className="size-4.5" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Upcoming Tours Section */}
      <section className="px-4 md:px-8 py-20 bg-muted/20 border-t border-border">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-dark tracking-tight font-display">Upcoming Live Tours</h2>
            <p className="text-muted-foreground mt-2 font-medium text-lg">Mark your calendar and set a reminder for our next live journeys.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {UPCOMING_TOURS.map((tour) => (
              <motion.div 
                key={tour.id}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden border border-border shadow-sm group hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={tour.img} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {tour.tags.map(tag => (
                      <span key={tag} className="bg-white/95 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-md text-dark shadow-md uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-8 space-y-5">
                  <div className="space-y-3">
                    <h3 className="font-bold text-xl text-dark leading-tight group-hover:text-coral transition-colors line-clamp-1 font-display">
                      {tour.title}
                    </h3>
                    <div className="flex items-center gap-2.5 text-coral font-bold text-xs">
                      <Bell className="size-4" />
                      <span className="uppercase tracking-widest">{tour.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="size-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground border border-border/50">
                        {tour.host[0]}
                      </div>
                      <span className="text-xs font-bold text-gray-500 tracking-wide uppercase">{tour.host}</span>
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-muted hover:bg-coral/10 hover:text-coral text-dark text-xs font-bold transition-all active:scale-95 shadow-sm">
                      <Bell className="size-4" />
                      <span>Remind Me</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
