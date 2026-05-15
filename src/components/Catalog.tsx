import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { TOURS, CATS } from '../constants';
import { TourCategory } from '../types';
import TourCard from './TourCard';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Catalog() {
  const [activeCat, setActiveCat] = useState<TourCategory>("All");
  const [search, setSearch] = useState("");

  const filteredTours = TOURS.filter(tour => {
    const matchesCat = activeCat === "All" || tour.category === activeCat;
    const matchesSearch = tour.title.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="catalog" className="px-4 md:px-8 py-16 bg-white max-w-[1440px] mx-auto border-t border-border">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14">
        <div className="space-y-3 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-dark">Browse the Catalog</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md">Find your next destination with our powerful search and filters.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-end gap-4">
          <div className="relative group min-w-[280px] sm:min-w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-coral transition-colors" />
            <input 
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-border pl-12 pr-4 py-3.5 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-coral/5 focus:border-coral transition-all shadow-sm font-medium"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-border rounded-2xl text-sm font-bold hover:border-coral hover:text-coral transition-all shadow-sm active:scale-95">
            <SlidersHorizontal className="size-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-12 pb-2 overflow-x-auto scrollbar-hide">
        {CATS.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={cn(
              "px-8 py-3 rounded-full text-sm font-bold transition-all border whitespace-nowrap active:scale-95",
              activeCat === cat 
                ? "bg-dark text-white border-dark shadow-xl shadow-dark/10" 
                : "bg-white text-muted-foreground border-border hover:border-coral hover:text-coral"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        <AnimatePresence mode="popLayout">
          {filteredTours.map((tour) => (
            <motion.div
              layout
              key={tour.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              <TourCard tour={tour} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTours.length === 0 && (
        <div className="text-center py-32">
          <div className="text-5xl mb-6">🏜️</div>
          <h3 className="text-2xl font-bold text-dark mb-3 tracking-tight">No destinations found</h3>
          <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
          <button 
            onClick={() => { setActiveCat("All"); setSearch(""); }}
            className="mt-8 text-coral font-bold hover:underline px-6 py-2 rounded-full hover:bg-coral/5 transition-all"
          >
            Reset all filters
          </button>
        </div>
      )}

      <div className="mt-20 flex justify-center">
        <button className="px-12 py-4 bg-white border border-border rounded-2xl text-sm font-bold text-dark hover:border-coral hover:text-coral hover:shadow-xl transition-all active:scale-95 shadow-sm">
          Load More Tours
        </button>
      </div>
    </section>
  );
}
