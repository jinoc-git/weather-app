import { useSearchModal } from '@/entities/search';
import { SearchModal } from '@/features/search';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';

export const SearchFloatingButton = () => {
  const { isOpen, close, open } = useSearchModal();

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={open}
        className="fixed bottom-8 right-8 z-30 w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer">
        <Search size={28} />
      </motion.button>

      <SearchModal isOpen={isOpen} close={close} />
    </>
  );
};
