import { Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 px-4 md:px-8 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-teal">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl">Lagos Rhythm</span>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-500">
          {['About', 'Terms', 'Privacy', 'Contact'].map(link => (
            <a key={link} href="#" className="hover:text-teal transition-colors">{link}</a>
          ))}
        </div>

        <div className="text-sm font-medium text-gray-400">
          © 2024 Lagos Rhythm. All rights reserved.
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="flex gap-4">
           {/* Simple Social Icons */}
           {[
             { name: 'IG', color: 'hover:text-pink-500' },
             { name: 'TW', color: 'hover:text-blue-400' },
             { name: 'FB', color: 'hover:text-blue-600' },
             { name: 'YT', color: 'hover:text-red-500' }
           ].map(s => (
             <a key={s.name} href="#" className={`text-gray-400 ${s.color} transition-all font-bold text-xs`}>{s.name}</a>
           ))}
        </div>
        <p className="text-[10px] text-gray-300 font-bold tracking-[0.2em] uppercase">
          Heart of Africa Virtual Experiences
        </p>
      </div>
    </footer>
  );
}
