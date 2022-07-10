import { PexelsPhoto } from '../../types/apiService';

export interface MainState {
  trends: number[];
  photo: PexelsPhoto | null;
  isLoading: boolean;
  error: Error | null;
}
