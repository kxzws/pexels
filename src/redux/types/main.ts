import { pexelsPhoto } from '../../types/apiService';

interface mainState {
  trends: number[];
  photo: pexelsPhoto | null;
  isLoading: boolean;
  error: Error | null;
}

export type { mainState };
