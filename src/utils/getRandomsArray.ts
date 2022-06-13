import getRandomNum from './getRandomNum';
import trends from './trends';

const getRandomArray = (): Array<number> => {
  const len = trends.length;
  const arr: Array<number> = [];
  while (arr.length < 7) {
    const random = getRandomNum(0, len - 1);
    if (arr.indexOf(random) < 0) {
      arr.push(random);
    }
  }
  return arr;
};

export default getRandomArray;
