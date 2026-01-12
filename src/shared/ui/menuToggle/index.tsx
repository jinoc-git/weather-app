import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
};

export const MenuToggle = ({ isOpen, onClick, className }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`relative p-2 rounded-full hover:bg-white/10 transition-colors z-50 ${className}`}
      aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}>
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        className="relative flex items-center justify-center text-white">
        <motion.div
          variants={{
            closed: { opacity: 1, rotate: 0 },
            open: { opacity: 0, rotate: 90 },
          }}
          transition={{ duration: 0.2 }}
          className="absolute">
          <Menu size={24} />
        </motion.div>

        <motion.div
          variants={{
            closed: { opacity: 0, rotate: -90 },
            open: { opacity: 1, rotate: 0 },
          }}
          transition={{ duration: 0.2 }}>
          <X size={24} />
        </motion.div>
      </motion.div>
    </button>
  );
};
