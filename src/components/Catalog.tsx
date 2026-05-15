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
    <section id="catalog" className="px-4 md:px-8 py-16 bg-white/50 border-t border-gray-100">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Browse the Catalog</h2>
          <p className="text-gray-500 max-w-md">Find your next destination with our powerful search and filters.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group min-w-[280px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-teal transition-colors" />
            <input 
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-teal/5 focus:border-teal transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold hover:border-teal hover:text-teal transition-all shadow-sm">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10 pb-2 overflow-x-auto scrollbar-hide">
        {CATS.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-bold transition-all border whitespace-nowrap",
              activeCat === cat 
                ? "bg-dark text-white border-dark shadow-lg shadow-dark/10" 
                : "bg-white text-gray-500 border-gray-200 hover:border-teal hover:text-teal"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
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
        <div className="text-center py-24">
          <div className="text-4xl mb-4">🏝️</div>
          <h3 className="text-xl font-bold mb-2">No destinations found</h3>
          <p className="text-gray-500">Try adjusting your search or category filter.</p>
          <button 
            onClick={() => { setActiveCat("All"); setSearch(""); }}
            className="mt-6 text-teal font-bold hover:underline"
          >
            Reset all filters
          </button>
        </div>
      )}

      <div className="mt-16 flex justify-center">
        <button className="px-8 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-teal hover:text-teal hover:shadow-md transition-all">
          Load More Tours
        </button>
      </div>
    </section>
  );
}
