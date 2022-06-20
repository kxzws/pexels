import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pexelsPhoto } from '../../types/apiService';
import CONSTANTS from '../../utils/constants';
import { getCuratedImages, getSearchingImages } from '../thunks/imagesThunks';
import { imagesState } from '../types/images';

const { DEFAULT_PAGE } = CONSTANTS.PHOTO_QUERY;
const initialState: imagesState = {
  images: [],
  pageNum: DEFAULT_PAGE,
  isLoading: false,
  hasNextPage: true,
  error: null,
};

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    nextPage(state) {
      state.pageNum += 1;
    },
    cleanImages(state) {
      state.images = [];
      state.isLoading = false;
      state.hasNextPage = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCuratedImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCuratedImages.fulfilled, (state, action: PayloadAction<pexelsPhoto[]>) => {
        const { payload } = action;
        state.images.push(...payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getCuratedImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as Error;
      });
  },
});

export default imagesSlice.reducer;
