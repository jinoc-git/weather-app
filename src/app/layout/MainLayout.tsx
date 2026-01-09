import { Header } from '@/app/widgets/header';
import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <main className="min-h-screen w-full bg-gradient-base flex flex-col  items-center p-4">
      <Header />
      {children}
    </main>
  );
};
