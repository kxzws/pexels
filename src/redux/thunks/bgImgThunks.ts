import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSearchingPhotos } from '../../api/apiService';
import CONSTANTS from '../../utils/constants';

const getBgPhotos = createAsyncThunk('bgImg/getPhotos', async (_, { rejectWithValue }) => {
  try {
    const { QUERY, PHOTOS_COUNT } = CONSTANTS.BACKGROUND;
    const response = await fetchSearchingPhotos(QUERY, PHOTOS_COUNT);
    return response.photos;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export default getBgPhotos;
