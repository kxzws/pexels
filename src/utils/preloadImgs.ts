import { pexelsPhoto } from '../types/apiService';

const preloadImgs = (arr: pexelsPhoto[]) => {
  arr.forEach((img) => {
    const preloadImg = new Image();
    preloadImg.src = img.src.original;
  });
};

export default preloadImgs;
