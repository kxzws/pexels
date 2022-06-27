import { orientationPexels, pexelsPhoto, sizePexels } from '../../types/apiService';

interface imagesState {
  totalCount: number;
  images: pexelsPhoto[];
  orientation: orientationPexels | null;
  size: sizePexels | null;
  pageNum: number;
  isLoading: boolean;
  hasNextPage: boolean;
  error: Error | null;
}

export type { imagesState };
