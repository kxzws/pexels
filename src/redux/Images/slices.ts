import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrientationPexels, PexelsData, SizePexels } from '../../types/apiService';
import CONSTANTS from '../../utils/constants';
import { getCuratedImages, getSearchingImages } from './thunks';
import { ImagesState } from './types';
import removeDoubles from '../../utils/removeDoubles';

const totalCountStart = 0;
const onePage = 1;
const { DEFAULT_PAGE } = CONSTANTS.PHOTO_QUERY;
const initialState: ImagesState = {
  totalCount: totalCountStart,
  images: [],
  orientation: null,
  size: null,
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
      state.pageNum += onePage;
    },
    changeOrientation(state, action: PayloadAction<OrientationPexels | null>) {
      state.orientation = action.payload;
    },
    changeSize(state, action: PayloadAction<SizePexels | null>) {
      state.size = action.payload;
    },
    cleanFilters(state) {
      state.orientation = null;
      state.size = null;
    },
    cleanImages(state) {
      state.totalCount = totalCountStart;
      state.images = [];
      state.pageNum = DEFAULT_PAGE;
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
      .addCase(getCuratedImages.fulfilled, (state, action: PayloadAction<PexelsData>) => {
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
      .addCase(getSearchingImages.fulfilled, (state, action: PayloadAction<PexelsData>) => {
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
