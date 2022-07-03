import { PexelsPhoto } from '../../types/apiService';

export interface mainState {
  trends: number[];
  photo: PexelsPhoto | null;
  isLoading: boolean;
  error: Error | null;
}
