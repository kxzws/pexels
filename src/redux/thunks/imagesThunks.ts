import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSearchingPhotos, fetchCuratedPhotos } from '../../api/apiService';
import { OrientationPexels, SizePexels } from '../../types/apiService';
import CONSTANTS from '../../utils/constants';

export const getCuratedImages = createAsyncThunk(
  'images/getCurated',
  async (currentPage: number, { rejectWithValue }) => {
    try {
      const { DEFAULT_PER_PAGE } = CONSTANTS.PHOTO_QUERY;
      const response = await fetchCuratedPhotos(DEFAULT_PER_PAGE, currentPage);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getSearchingImages = createAsyncThunk(
  'images/getSearching',
  async (
    queryData: {
      input: string;
      currentPage: number;
      orientation?: OrientationPexels | null;
      size?: SizePexels | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const { input, currentPage, orientation, size } = queryData;
      const { DEFAULT_PER_PAGE } = CONSTANTS.PHOTO_QUERY;
      const response = await fetchSearchingPhotos(
        input,
        DEFAULT_PER_PAGE,
        currentPage,
        orientation,
        size
      );
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
