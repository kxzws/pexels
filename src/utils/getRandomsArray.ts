import getRandomNum from './getRandomNum';
import trendsData from './trendsData';

const trendsCount = 7;

const getRandomArray = (): Array<number> => {
  const len = trendsData.length;
  const arr: Array<number> = [];
  while (arr.length < trendsCount) {
    const random = getRandomNum(0, len - 1);
    if (arr.indexOf(random) < 0) {
      arr.push(random);
    }
  }
  return arr;
};

export default getRandomArray;
