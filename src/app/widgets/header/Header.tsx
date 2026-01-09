import { MapPin, Menu } from 'lucide-react';

type Props = {
  currentPlace: string;
};

export const Header = ({ currentPlace }: Props) => {
  return (
    <header className="flex justify-between items-center p-6 pt-8">
      <button className="p-2 bg-white/40 rounded-full hover:bg-white/60 transition">
        <Menu size={24} className="text-slate-700" />
      </button>
      <div className="flex items-center gap-2">
        <MapPin size={18} className="text-blue-600" />
        <span className="font-bold text-lg">{currentPlace}</span>
      </div>
    </header>
  );
};
