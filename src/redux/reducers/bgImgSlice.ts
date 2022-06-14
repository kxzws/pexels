import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pexelsPhoto } from '../../types/apiService';
import CONSTANTS from '../../utils/constants';
import getRandomNum from '../../utils/getRandomNum';
import getBgPhotos from '../thunks/bgImgThunks';
import { bgImgState } from '../types/bgImg';

const initialState: bgImgState = {
  photo: null,
  isLoading: false,
  error: null,
};

export const bgImgSlice = createSlice({
  name: 'bgImg',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBgPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBgPhotos.fulfilled, (state, action: PayloadAction<pexelsPhoto[]>) => {
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

export default bgImgSlice.reducer;
