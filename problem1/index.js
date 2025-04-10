const readline = require("readline");

const CLAPS_NUMBERS = [3, 6, 9];
const CLAPS_NUMBER_LENGTH = CLAPS_NUMBERS.length;
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getLeftSideNumber = (str, position) => {
  if (position === 0) return 0;
  return parseInt(str.substring(0, position));
};

const getRightSideNumber = (str, position) => {
  if (position === str.length - 1) return 0;
  return parseInt(str.substring(position + 1));
};

const sumClapsFrom1toN = (n) => {
  if (n < 1) return 0;
  let totalCount = 0;
  const convertedStr = n.toString();
  const totalDigits = convertedStr.length;

  for (let position = 0; position < totalDigits; position++) {
    const power = totalDigits - 1 - position;
    const powerOfTen = Math.pow(10, power);
    const currentDigit = parseInt(convertedStr[position]);
    const leftNumber = getLeftSideNumber(convertedStr, position);
    const rightNumber = getRightSideNumber(convertedStr, position);

    if (currentDigit === 0) {
      totalCount += leftNumber * powerOfTen * CLAPS_NUMBER_LENGTH;
    } else {
      CLAPS_NUMBERS.forEach((num) => {
        if (num < currentDigit) {
          totalCount += (leftNumber + 1) * powerOfTen;
        } else if (num === currentDigit) {
          totalCount += leftNumber * powerOfTen + rightNumber + 1;
        } else {
          totalCount += leftNumber * powerOfTen;
        }
      });
    }
  }

  return totalCount;
};

const sumClapsInRange = (a, b) => {
  return sumClapsFrom1toN(b) - sumClapsFrom1toN(a - 1);
};

readlineInterface.question("", (input) => {
  const [a, b] = input.split(" ").map((num) => parseInt(num));
  const res = sumClapsInRange(a, b);
  console.log(res);
  readlineInterface.close();
});
