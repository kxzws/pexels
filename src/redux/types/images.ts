import { pexelsPhoto } from '../../types/apiService';

interface imagesState {
  images: pexelsPhoto[];
  pageNum: number;
  isLoading: boolean;
  hasNextPage: boolean;
  error: Error | null;
}

export type { imagesState };
