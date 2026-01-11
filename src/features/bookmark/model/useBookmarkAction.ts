import { useBookmarkStore, type Bookmark } from '@/entities/bookmark';

type PlaceData = Omit<Bookmark, 'nickname'>;

export const useBookmarkAction = (place: PlaceData) => {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const addBookmark = useBookmarkStore((state) => state.addBookmark);
  const removeBookmark = useBookmarkStore((state) => state.removeBookmark);

  const isBookmarked = bookmarks.some((b) => b.address === place.address);

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(place.address);
    } else {
      addBookmark(place);
    }
  };

  return { isBookmarked, toggleBookmark };
};
