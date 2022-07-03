import { OrientationPexels, PexelsPhoto, SizePexels } from '../../types/apiService';

export interface imagesState {
  totalCount: number;
  images: PexelsPhoto[];
  orientation: OrientationPexels | null;
  size: SizePexels | null;
  pageNum: number;
  isLoading: boolean;
  hasNextPage: boolean;
  error: Error | null;
}
