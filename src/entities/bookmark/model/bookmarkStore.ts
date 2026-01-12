import type { CityDto } from '@/entities/search';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Bookmark = CityDto;

type BookmarkState = {
  bookmarks: Bookmark[];
  addBookmark: (place: Omit<Bookmark, 'nickname'>) => boolean;
  removeBookmark: (address: string) => void;
  updateNickname: (address: string, newNickname: string) => void;
};

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      addBookmark: (place) => {
        const { bookmarks } = get();
        if (bookmarks.length >= 6) {
          toast.error('즐겨찾기 개수 초과입니다');
          return false;
        }

        const isDuplicate = bookmarks.some((b) => b.address === place.address);
        if (isDuplicate) {
          toast.error('이미 즐겨찾기한 위치입니다');
          return false;
        }

        set({
          bookmarks: [...bookmarks, { ...place, nickname: place.placeName }],
        });
        return true;
      },

      removeBookmark: (address) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.address !== address),
        }));
      },

      updateNickname: (address, newNickname) =>
        set((state) => ({
          bookmarks: state.bookmarks.map((b) =>
            b.address === address ? { ...b, nickname: newNickname } : b
          ),
        })),
    }),
    {
      name: 'weather-bookmarks',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
