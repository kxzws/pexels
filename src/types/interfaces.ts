import { AsyncThunk } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { pexelsPhoto } from './apiService';

export interface ImagesListProps {
  items: pexelsPhoto[];
  loadMore: () => void;
  isLoading: boolean;
  hasNextPage: boolean;
}

export interface ImageItemProps {
  image: string;
  num: number;
  style: React.CSSProperties | undefined;
  loading: boolean;
}
