import { AnimatePresence, motion, type Variants } from 'motion/react';
import { Star } from 'lucide-react';
import { useBookmarkStore } from '@/entities/bookmark';
import { MenuToggle, useScrollLock } from '@/shared';
import type { CityDto } from '@/entities/search';
import { BookmarkItem } from '@/widgets/sidebar/ui/bookmarkItem';
import { EmptyBookmark } from '@/widgets/sidebar/ui/emptyBookmark';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  locationUI: React.ReactNode;
  onItemClick: (cityData: CityDto) => void;
};

const sidebarVariants: Variants = {
  closed: { x: '100%', opacity: 0 },
  open: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
};

export const Sidebar = ({
  isOpen,
  onClose,
  locationUI,
  onItemClick,
}: Props) => {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);

  useScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* 사이드바 패널 */}
          <motion.aside
            initial="closed"
            animate="open"
            exit="exit"
            variants={sidebarVariants}
            className="fixed inset-y-0 right-0 z-50 w-full md:w-[320px] bg-[#1a1c22] shadow-2xl border-l border-white/10 flex flex-col">
            <div className="w-full flex items-center py-4 pl-4 md:py-8 pr-2 md:pr-6 pb-4 relative shrink-0">
              <div className="flex items-center justify-between gap-3 w-full">
                {locationUI}
                <MenuToggle isOpen={true} onClick={onClose} className="-ml-2" />
              </div>
            </div>

            {/* 즐겨찾기 리스트 영역 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
              <h2 className="text-sm font-semibold text-gray-400 mb-3 px-1 flex items-center gap-2">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                즐겨찾기 목록
              </h2>

              {bookmarks.length === 0 ? (
                <EmptyBookmark />
              ) : (
                bookmarks.map((city) => (
                  <BookmarkItem
                    key={`sidebar-${city.address}`}
                    city={city}
                    onClick={() => onItemClick(city)}
                  />
                ))
              )}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
};
