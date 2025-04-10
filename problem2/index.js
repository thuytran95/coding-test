const readline = require("readline");

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const countValidPairs = (str) => {
  let balance = 0;
  let pairs = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") {
      balance++;
    } else if (balance > 0) {
      balance--;
      pairs++;
    }
  }
  return pairs;
};

const countMaxPairsAfterSwitch = (s) => {
  const strLength = s.length;
  let maxPairs = countValidPairs(s);

  for (let i = 0; i < strLength; i++) {
    const newStr = s.substring(0, i) + (s[i] === "(" ? ")" : "(") + s.substring(i + 1);
    const newPairs = countValidPairs(newStr);
    maxPairs = Math.max(maxPairs, newPairs);
  }

  return maxPairs;
};

readlineInterface.question("", (input) => {
  const s = input.trim();
  const res = countMaxPairsAfterSwitch(s);
  console.log(res);
  readlineInterface.close();
});