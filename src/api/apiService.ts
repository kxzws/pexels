import axios from 'axios';
import CONSTANTS from '../utils/constants';
import { OrientationPexels, PexelsData, SizePexels } from '../types/apiService';

const requestTimeout = 5000;
const { DEFAULT_PAGE, DEFAULT_PER_PAGE } = CONSTANTS.PHOTO_QUERY;
const axiosInst = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: requestTimeout,
  headers: {
    Authorization: `${process.env.REACT_APP_API_KEY}`,
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
    const QUERY_URL = 'search';
    const response = await axiosInst.get(QUERY_URL, {
      params: {
        query,
        per_page: perPage,
        page,
        orientation,
        size,
      },
    });
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
    const QUERY_URL = 'curated';
    const response = await axiosInst.get(QUERY_URL, {
      params: {
        per_page: perPage,
        page,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
