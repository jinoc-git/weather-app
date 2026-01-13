import { useEffect, useEffectEvent, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { cn, useScrollLock } from '@/shared/lib';

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
};

const defaultVariants: Variants = {
  initial: { y: '100%' },
  animate: { y: 0 },
  exit: { y: '100%' },
};

export const PortalModal = ({
  children,
  isOpen,
  onClose,
  className = cn(
    'fixed inset-0 z-50 w-screen h-screen overscroll-none flex flex-col',
    'bg-[#1a1c22] text-white'
  ),
}: Props) => {
  const [mounted, setMounted] = useState(false);

  const setMount = useEffectEvent(() => {
    setMounted(true);
  });

  useEffect(() => {
    setMount();
  }, []);

  useEffect(() => {
    if (!isOpen || !onClose) return;

    if (window.history.state?.modalOpen !== true) {
      window.history.pushState({ modalOpen: true }, '');
    }

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);

      if (window.history.state?.modalOpen) {
        window.history.back();
      }
    };
  }, [isOpen, onClose]);

  useScrollLock(isOpen);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={defaultVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className={`${className} flex flex-col`}
          style={{ touchAction: 'none' }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
