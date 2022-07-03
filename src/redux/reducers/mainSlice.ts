import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PexelsPhoto } from '../../types/apiService';
import CONSTANTS from '../../utils/constants';
import getRandomNum from '../../utils/getRandomNum';
import getRandomArray from '../../utils/getRandomsArray';
import getBgPhotos from '../thunks/mainThunks';
import { mainState } from '../types/main';

const initialState: mainState = {
  trends: [],
  photo: null,
  isLoading: false,
  error: null,
};

export const mainSlice = createSlice({
  name: 'bgImg',
  initialState,
  reducers: {
    getTrends(state) {
      const randomArray = getRandomArray();
      state.trends = [...randomArray];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBgPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBgPhotos.fulfilled, (state, action: PayloadAction<PexelsPhoto[]>) => {
        const { PHOTOS_COUNT } = CONSTANTS.BACKGROUND;
        const image = action.payload[getRandomNum(0, PHOTOS_COUNT)];
        state.photo = image;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getBgPhotos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as Error;
      });
  },
});

export default mainSlice.reducer;
