import { pexelsPhoto } from '../../types/apiService';

interface bgImgState {
  photo: pexelsPhoto | null;
  isLoading: boolean;
  error: Error | null;
}

export type { bgImgState };
