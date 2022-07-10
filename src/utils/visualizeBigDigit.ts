const maxUnits = 999;
const maxThousands = 999999;

const visualizeBigDigit = (input: number): string => {
  if (input > maxThousands) {
    return `${(input - (input % 100000)) / 1000000} млн`;
  }
  if (input > maxUnits) {
    return `${(input - (input % 100)) / 1000} тыс.`;
  }
  return `${input}`;
};

export default visualizeBigDigit;
