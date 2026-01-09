import { Header } from '@/app/widgets/header';
import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <main className="min-h-screen w-full bg-linear-to-br from-blue-400 via-sky-300 to-indigo-200 flex justify-center items-center p-4">
      <div className="w-full h-full bg-white/30 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/40 overflow-hidden relative text-slate-700 flex flex-col">
        <Header currentPlace="서울 종로구" />
        {children}
      </div>
    </main>
  );
};
