import { PexelsPhoto } from '../types/apiService';

const removeDoubles = (arr: PexelsPhoto[], payload: PexelsPhoto[]): PexelsPhoto[] => {
  const indexes = arr.map((item) => item.id);
  const news = payload.filter((item) => indexes.indexOf(item.id) < 0);
  return news;
};

export default removeDoubles;
