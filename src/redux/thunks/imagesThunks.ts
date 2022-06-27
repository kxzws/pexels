import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSearchingPhotos, fetchCuratedPhotos } from '../../api/apiService';
import { orientationPexels, sizePexels } from '../../types/apiService';
import CONSTANTS from '../../utils/constants';

export const getCuratedImages = createAsyncThunk(
  'images/getCurated',
  async (currentPage: number, { rejectWithValue }) => {
    try {
      if (currentPage === 0) {
        throw new Error('invalid current page; curated fetching');
      }
      const { DEFAULT_PER_PAGE } = CONSTANTS.PHOTO_QUERY;
      // ### DEVELOP BUG
      console.log('fetch curated from currpage', currentPage);
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
      orientation?: orientationPexels | null;
      size?: sizePexels | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const { input, currentPage, orientation, size } = queryData;
      if (currentPage === 0) {
        throw new Error('invalid current page; search fetching');
      }
      const { DEFAULT_PER_PAGE } = CONSTANTS.PHOTO_QUERY;
      // ### DEVELOP BUG
      console.log('fetch search from currpage', currentPage);
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
