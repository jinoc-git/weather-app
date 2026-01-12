import { Header } from '@/widgets/header';
import { SearchFloatingButton } from '@/widgets/searchFloatingButton';
import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <>
      <div className="fixed inset-0 w-full h-full bg-gradient-base! -z-50 " />
      <main className="relative h-screen w-full p-4 overflow-hidden flex flex-col">
        <div className="w-full pb-4 md:pt-4 md:px-4 shrink-0">
          <Header />
        </div>
        <div className="flex-1 w-full overflow-y-auto custom-scrollbar-light px-4 pb-10">
          <div className="w-full flex flex-col items-center gap-6 md:flex-row md:flex-wrap md:justify-center">
            {children}
          </div>
        </div>

        <SearchFloatingButton />
      </main>
    </>
  );
};
