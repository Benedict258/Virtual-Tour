import React from 'react';
import { Eye, TrendingUp } from 'lucide-react';
import { Tour } from '../types';
import { CATEGORY_STYLES } from '../constants';
import { cn } from '../lib/utils';

interface TourCardProps {
  tour: Tour;
  variant?: 'compact' | 'standard';
}

const TourCard: React.FC<TourCardProps> = ({ tour, variant = 'standard' }) => {
  const isCompact = variant === 'compact';
  
  return (
    <div className={cn(
      "group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex-shrink-0 border border-gray-100",
      isCompact ? "w-48" : "w-64"
    )}>
      <div className={cn(
        "relative overflow-hidden",
        isCompact ? "h-36" : "h-44",
        tour.imgClass,
        "bg-cover bg-center"
      )}>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        
        <span className={cn(
          "absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase",
          CATEGORY_STYLES[tour.category]
        )}>
          {tour.category}
        </span>
        
        <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-md font-medium">
          {tour.duration}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-sans font-semibold text-sm leading-tight line-clamp-2 group-hover:text-teal transition-colors">
          {tour.title}
        </h3>
        
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-[10px] md:text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{tour.views}</span>
          </div>
          
          {tour.trend && (
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span>{tour.trend}</span>
            </div>
          )}
          
          {tour.isFree && (
            <span className="font-bold text-teal flex items-center">
              <span className="w-1 h-1 rounded-full bg-teal/30 mr-2" />
              Free
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourCard;
