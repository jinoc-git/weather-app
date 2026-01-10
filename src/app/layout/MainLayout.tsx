import { Header } from '@/widgets/header';
import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <>
      <div className="fixed inset-0 w-full h-full bg-gradient-base -z-50" />
      <main className="min-h-screen w-full p-4">
        <Header />
        <div className="w-full flex flex-col items-center gap-6 md:flex-row md:flex-wrap md:justify-center ">
          {children}
        </div>
      </main>
    </>
  );
};
