import { useBookmarkStore, type Bookmark } from '@/entities/bookmark';
import toast from 'react-hot-toast';

type PlaceData = Omit<Bookmark, 'nickname'>;

export const useBookmarkAction = (place: PlaceData) => {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const addBookmark = useBookmarkStore((state) => state.addBookmark);
  const removeBookmark = useBookmarkStore((state) => state.removeBookmark);

  const isBookmarked = bookmarks.some((b) => b.address === place.address);

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(place.address);
      toast.error(`즐겨찾기에 ${place.placeName}이 제거되었어요`);
    } else {
      addBookmark(place);
      toast.success(`즐겨찾기에 ${place.placeName}이 추가되었어요`);
    }
  };

  return { isBookmarked, toggleBookmark };
};
