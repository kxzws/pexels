const visualizeBigDigit = (input: number): string => {
  if (input > 999999) {
    return `${(input - (input % 100000)) / 1000000} млн`;
  }
  if (input > 999) {
    return `${(input - (input % 100)) / 1000} тыс.`;
  }
  return `${input}`;
};

export default visualizeBigDigit;
