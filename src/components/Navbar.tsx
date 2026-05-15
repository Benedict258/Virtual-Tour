import { Globe, Menu } from 'lucide-react';

interface NavbarProps {
  onBecomeHost: () => void;
}

export default function Navbar({ onBecomeHost }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between px-4 md:px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-teal">
          <Globe className="w-5 h-5 text-white" />
        </div>
        <span className="font-display font-bold text-xl md:text-2xl">Lagos Rhythm</span>
      </div>
      
      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
        <a href="#live" className="hover:text-teal transition-colors">Live Tour</a>
        <a href="#catalog" className="hover:text-teal transition-colors">Destinations</a>
        <a href="#experiences" className="hover:text-teal transition-colors">Experiences</a>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={onBecomeHost} 
          className="text-sm font-semibold px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors hidden sm:block"
        >
          Become a Host
        </button>
        <button className="p-2 rounded-full border border-gray-200 md:hidden">
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <div className="hidden md:flex items-center gap-2 border border-gray-200 rounded-full px-2 py-1">
          <Menu className="w-4 h-4 text-gray-500" />
          <div className="w-6 h-6 rounded-full bg-gray-200" />
        </div>
      </div>
    </nav>
  );
}
