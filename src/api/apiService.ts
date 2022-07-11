import axios from 'axios';
import CONSTANTS from '../utils/constants';
import { OrientationPexels, PexelsData, SizePexels } from '../types/apiService';

const requestTimeout = 5000;
const { URL } = CONSTANTS.API;
const { DEFAULT_PAGE, DEFAULT_PER_PAGE } = CONSTANTS.PHOTO_QUERY;
const axiosInst = axios.create({
  baseURL: URL,
  timeout: requestTimeout,
  headers: {
    Authorization: `${process.env.REACT_APP_API_KEY}`,
    'Access-Control-Allow-Origin': '*',
  },
});

export const fetchSearchingPhotos = async (
  query: string,
  perPage: number | null = DEFAULT_PER_PAGE,
  page: number | null = DEFAULT_PAGE,
  orientation: OrientationPexels | null = null,
  size: SizePexels | null = null
): Promise<PexelsData> => {
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
): Promise<PexelsData> => {
  try {
    const response = await axiosInst.get(`curated?per_page=${perPage}&page=${page}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
