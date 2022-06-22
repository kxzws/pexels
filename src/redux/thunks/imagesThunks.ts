import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSearchingPhotos, fetchCuratedPhotos } from '../../api/apiService';
import CONSTANTS from '../../utils/constants';

export const getCuratedImages = createAsyncThunk(
  'images/getCurated',
  async (currentPage: number, { rejectWithValue }) => {
    try {
      if (currentPage === 0) {
        throw new Error('invalid current page');
      }
      const { DEFAULT_PER_PAGE } = CONSTANTS.PHOTO_QUERY;
      // ### DEVELOP BUG
      console.log('fetch from currpage', currentPage);
      const response = await fetchCuratedPhotos(DEFAULT_PER_PAGE, currentPage);
      return response.photos;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getSearchingImages = createAsyncThunk(
  'images/getSearching',
  async (_, { rejectWithValue }) => {
    try {
      const { QUERY, PHOTOS_COUNT } = CONSTANTS.BACKGROUND;
      const response = await fetchSearchingPhotos(QUERY, PHOTOS_COUNT);
      return response.photos;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
