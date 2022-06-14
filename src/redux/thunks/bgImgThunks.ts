import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBgPhotos } from '../../api/apiService';

const getBgPhotos = createAsyncThunk('bgImg/getPhotos', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchBgPhotos();
    return response.photos;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export default getBgPhotos;
