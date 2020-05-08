const generateRandom = (num) => Math.round(Math.random() * num);

export const cells = (num, len) => {
  const lenght = len || num;
  const numberArray = Array(num)
    .fill('')
    .map((_, i) => i);
  let res = [];
  for (let i = 0; i < lenght; i += 1) {
    const random = generateRandom(numberArray.length - 1);
    res = [...res, ...numberArray.splice(random, 1)];
  }
  return res;
};
