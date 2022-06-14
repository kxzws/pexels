import axios from 'axios';
import CONSTANTS from '../utils/constants';
import { pexelsData } from '../types/apiService';

const { URL, API_KEY, BG_QUERY } = CONSTANTS.API;
const axiosInst = axios.create({
  baseURL: URL,
  timeout: 1000,
  headers: {
    Authorization: `${API_KEY}`,
  },
});

export const fetchBgPhotos = async (): Promise<pexelsData> => {
  try {
    const response = await axiosInst.get(`search?query=${BG_QUERY}&per_page=40`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchPhotosBySearch = async () => {};
