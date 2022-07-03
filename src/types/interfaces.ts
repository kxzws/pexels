import { PexelsPhoto } from './apiService';

export type LikedIDs = { [id: number]: boolean };

export interface ImagesListProps {
  items: PexelsPhoto[];
  loadMore: () => void;
  isLoading: boolean;
  hasNextPage: boolean;
}

export interface ImageItemProps {
  image: PexelsPhoto;
  likedIDs: Partial<LikedIDs>;
  setLikedIDs: (ids: Partial<LikedIDs>) => void;
}
