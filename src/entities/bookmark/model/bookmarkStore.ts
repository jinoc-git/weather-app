import type { CityDto } from '@/entities/search';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Bookmark = CityDto;

type BookmarkState = {
  bookmarks: Bookmark[];
  addBookmark: (place: Omit<Bookmark, 'nickname'>) => void;
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
          // 토스트 모달 추가 예정
          return;
        }

        const isDuplicate = bookmarks.some((b) => b.address === place.address);
        if (isDuplicate) {
          // 토스트 모달 추가 예정
          return;
        }

        set({
          bookmarks: [...bookmarks, { ...place, nickname: place.placeName }],
        });
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
