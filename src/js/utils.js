const getExpirySpan = security => {
  var today = new Date.now();
  console.log(security.maturity_date - today);
};

const getRandomZscore = () => {
  var min = 1;
  var max = 4;
  var random = Math.random() * (max - min) + min;
  var zScore = random.toFixed(2);
  return zScore;
};

const getRandomReversion = () => {
  var min = -20;
  var max = 100;
  var random = Math.floor(Math.random() * (max - min) + min);
  return random;
};

export { getExpirySpan, getRandomZscore, getRandomReversion };
