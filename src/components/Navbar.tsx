import { Globe, Menu, User } from 'lucide-react';

interface NavbarProps {
  onBecomeHost: () => void;
  onLogoClick: () => void;
  onLiveClick: () => void;
}

export default function Navbar({ onBecomeHost, onLogoClick, onLiveClick }: NavbarProps) {
  return (
    <header className="w-full flex flex-col fixed top-0 z-50">
      {/* Top Banner */}
      <div className="bg-teal text-white px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-2 relative z-10 shadow-sm leading-tight transition-transform duration-300">
        <span className="flex size-2 rounded-full bg-coral animate-pulse" />
        <span>Born From This Ground is Live! Join the tour now.</span>
      </div>

      {/* Main Nav */}
      <nav className="w-full flex items-center justify-between px-4 md:px-8 py-4 border-b border-border bg-white shadow-sm transition-all duration-300">
        <div 
          onClick={onLogoClick}
          className="flex items-center gap-2 cursor-pointer group hover:scale-[1.02] transition-transform"
        >
          <div className="size-8 rounded-full bg-coral flex items-center justify-center text-white shadow-lg shadow-coral/20 group-hover:shadow-coral/40 transition-all">
            <Globe className="size-[18px]" />
          </div>
          <span className="font-bold text-lg md:text-xl text-dark tracking-tight">
            Lagos Rhythm
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-dark">
          <button 
            onClick={onLiveClick}
            className="hover:text-coral transition-colors"
          >
            Live Tour
          </button>
          <a 
            href="#catalog" 
            onClick={(e) => {
              if (window.location.pathname !== '/') {
                onLogoClick();
              }
            }}
            className="hover:text-coral transition-colors"
          >
            Destinations
          </a>
          <a 
            href="#experiences" 
            className="hover:text-coral transition-colors"
          >
            Experiences
          </a>
        </div>

        <div className="flex items-center gap-4 text-sm font-semibold">
          <button 
            onClick={onBecomeHost} 
            className="hidden md:block hover:underline text-dark transition-all"
          >
            Become a Host
          </button>
          
          <button className="flex items-center gap-3 border border-border rounded-full px-3 py-1.5 bg-white hover:shadow-md transition-all active:scale-95 group">
            <Menu className="size-[16px] text-dark" />
            <div className="size-8 bg-muted rounded-full overflow-hidden flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <User className="text-muted-foreground size-[14px]" />
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
}
