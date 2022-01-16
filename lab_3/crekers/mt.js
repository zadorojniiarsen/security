import { casinoAction } from '../api/casino.js';
import { searchSequenceSeed } from './utils.js';

export default class CrekerMT {
  #account = null;

  constructor(account) {
    this.#account = account;
  }

  async run() {
    const lowerBound = this.#currentValue();
    const { status, body: { realNumber } } = await this.#playRequest();
    if (!realNumber || status !== 200) return null;
    const upperBound = this.#currentValue();

    const seed = searchSequenceSeed(realNumber, {
      start: lowerBound,
      finish: upperBound,
    });

    return isNaN(seed) ? null : seed;
  }

  async #playRequest() {
    return casinoAction({
      mode: 'Mt',
      id: this.#account.id,
      bet: 1,
      number: 1,
    });
  }

  #currentValue() {
    const coef = 10 ** -3;
    return Math.floor(Date.now() * coef);
  }
}
