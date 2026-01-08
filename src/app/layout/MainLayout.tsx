import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <main className="min-h-screen w-full bg-linear-to-br from-blue-400 via-sky-300 to-indigo-200 flex justify-center items-center p-4 sm:p-8">
      <div className="w-full h-[850px] bg-white/30 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/40 overflow-hidden relative text-slate-700 flex flex-col">
        {children}
      </div>
    </main>
  );
};
