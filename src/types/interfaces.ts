import { pexelsPhoto } from './apiService';

export interface ImagesListProps {
  items: pexelsPhoto[];
  loadMore: () => void;
  isLoading: boolean;
  hasNextPage: boolean;
}

export interface ImageItemProps {
  image: pexelsPhoto;
  liked: boolean;
  lazy: boolean;
  toggleLike: (id: number) => void;
}
