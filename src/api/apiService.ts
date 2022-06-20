import axios from 'axios';
import CONSTANTS from '../utils/constants';
import { orientationPexels, pexelsData, sizePexels } from '../types/apiService';

const { URL, API_KEY } = CONSTANTS.API;
const { DEFAULT_PAGE, DEFAULT_PER_PAGE } = CONSTANTS.PHOTO_QUERY;
const axiosInst = axios.create({
  baseURL: URL,
  timeout: 1000,
  headers: {
    Authorization: `${API_KEY}`,
  },
});

export const fetchSearchingPhotos = async (
  query: string,
  perPage: number | null = DEFAULT_PER_PAGE,
  page: number | null = DEFAULT_PAGE,
  orientation: orientationPexels | null = null,
  size: sizePexels | null = null
): Promise<pexelsData> => {
  try {
    const QUERY_URL = `search?query=${query}&per_page=${perPage}&page=${page}&orientation=${orientation}&size=${size}`;
    const response = await axiosInst.get(QUERY_URL);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchCuratedPhotos = async (
  perPage: number | null = DEFAULT_PER_PAGE,
  page: number | null = DEFAULT_PAGE
): Promise<pexelsData> => {
  try {
    const response = await axiosInst.get(`curated?per_page=${perPage}&page=${page}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
