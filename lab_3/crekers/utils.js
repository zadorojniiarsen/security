import MersenneTwister from 'mersenne-twister';

const createCalcContainer = (first, second) => ({
  first,
  second,
  findGcd(x, y) {
    const { second: secondOld } = this;
    const yZero = y === 0n;
    const result = yZero ? x : this.findGcd(y, mod(x, y));
    this.second = yZero ? 0n : (this.first - BigInt(Number(x / y)) * this.second);
    this.first = yZero ? 1n : secondOld;
    return result;
  },
});

const gcd = (first, second) => {
  const container = createCalcContainer(first, second);
  const result = container.findGcd(first, second);
  return [container.first, result];
};

export const modInverse = (value, mod) => {
  const [ result, foundGCD ] = gcd(value, mod);
  return foundGCD === 1n ? result : NaN;
};

export const mod = (first, second) => {
  const res = first % second;
  if (res < 0n) return second + res;
  return res;
};

export const searchSequenceSeed = (randonValue, bounds) => {
  const { start, finish } = bounds;
  for (let seed = start; seed <= finish; ++seed) {
    const generator = new MersenneTwister(seed);
    if (generator.random_int() === randonValue)
      return seed + 1;
  }
  return NaN;
}
