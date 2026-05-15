import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TOURS } from '../constants';
import TourCard from './TourCard';

export default function RecommendationSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="px-4 md:px-8 py-8 overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Recommended Tours</h2>
          <p className="text-sm md:text-base text-gray-500">Explore our growing library of immersive virtual experiences anytime, anywhere.</p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-teal transition-all group"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-teal" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-teal transition-all group"
          >
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 -mx-4 px-4 md:mx-0 md:px-0"
      >
        {TOURS.map(tour => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  );
}
