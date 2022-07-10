import { OrientationPexels, PexelsPhoto, SizePexels } from '../../types/apiService';

export interface ImagesState {
  totalCount: number;
  images: PexelsPhoto[];
  orientation: OrientationPexels | null;
  size: SizePexels | null;
  pageNum: number;
  isLoading: boolean;
  hasNextPage: boolean;
  error: Error | null;
}
