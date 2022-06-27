import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orientationPexels, pexelsData, sizePexels } from '../../types/apiService';
import CONSTANTS from '../../utils/constants';
import { getCuratedImages, getSearchingImages } from '../thunks/imagesThunks';
import { imagesState } from '../types/images';
import removeDoubles from '../../utils/removeDoubles';

const { DEFAULT_PAGE } = CONSTANTS.PHOTO_QUERY;
const initialState: imagesState = {
  totalCount: 0,
  images: [],
  orientation: null,
  size: null,
  pageNum: DEFAULT_PAGE - 1,
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
    changeOrientation(state, action: PayloadAction<orientationPexels>) {
      state.orientation = action.payload;
    },
    changeSize(state, action: PayloadAction<sizePexels>) {
      state.size = action.payload;
    },
    cleanImages(state) {
      state.totalCount = 0;
      state.images = [];
      state.pageNum = DEFAULT_PAGE - 1;
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
      .addCase(getCuratedImages.fulfilled, (state, action: PayloadAction<pexelsData>) => {
        const { payload } = action;
        state.totalCount = payload.total_results;
        const payloadNews = removeDoubles(state.images, payload.photos);
        state.images.push(...payloadNews);
        state.isLoading = false;
        state.hasNextPage = state.images.length < payload.total_results;
        state.error = null;
      })
      .addCase(getCuratedImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as Error;
      })
      .addCase(getSearchingImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchingImages.fulfilled, (state, action: PayloadAction<pexelsData>) => {
        const { payload } = action;
        state.totalCount = payload.total_results;
        const payloadNews = removeDoubles(state.images, payload.photos);
        state.images.push(...payloadNews);
        state.isLoading = false;
        state.hasNextPage = state.images.length < payload.total_results;
        state.error = null;
      })
      .addCase(getSearchingImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as Error;
      });
  },
});

export default imagesSlice.reducer;
