import { Menu } from 'lucide-react';

export const Header = () => {
  return (
    <header className="w-full flex justify-between items-center py-4">
      <button className="p-2 bg-white/40 rounded-full hover:bg-white/60 transition">
        <Menu size={24} className="text-slate-700" />
      </button>
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">Weather-App</span>
      </div>
    </header>
  );
};
