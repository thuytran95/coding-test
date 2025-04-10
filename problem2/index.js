const readline = require("readline");

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const recalculateParenthesesAfterFlip = (
  s,
  totalOpenParenthese,
  totalCloseParenthese
) => {
  let newTotalOpenParenthese = totalOpenParenthese;
  let newTotalCloseParenthese = totalCloseParenthese;

  if (s === "(") {
    newTotalOpenParenthese--;
    newTotalCloseParenthese++;
  } else {
    newTotalOpenParenthese++;
    newTotalCloseParenthese--;
  }

  return Math.min(newTotalOpenParenthese, newTotalCloseParenthese);
};

const countMaxPairsAfterSwitch = (s) => {
  const strLength = s.length;
  let totalOpenParenthese = 0;
  let totalCloseParenthese = 0;

  for (let i = 0; i < strLength; i++) {
    if (s[i] === "(") totalOpenParenthese++;
    else totalCloseParenthese++;
  }

  let maxPairs = Math.min(totalOpenParenthese, totalCloseParenthese);

  for (let i = 0; i < strLength; i++) {
    const newMaxPairs = recalculateParenthesesAfterFlip(
      s[i],
      totalOpenParenthese,
      totalCloseParenthese
    );

    maxPairs = Math.max(maxPairs, newMaxPairs);
  }

  return maxPairs;
};

readlineInterface.question("", (input) => {
  const s = input.trim();
  const res = countMaxPairsAfterSwitch(s);
  console.log(res);
  readlineInterface.close();
});
