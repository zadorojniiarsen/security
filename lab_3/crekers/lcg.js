import { casinoAction } from '../api/casino.js';
import { mod, modInverse } from './utils.js';

export default class CrekerLCG {
  #account = null;
  #ws = new Array(3);
  #mod = 2n ** 32n;

  constructor(account) {
    this.#account = account;
  }

  async run() {
    for (let i = 0; i < this.#ws.length; ++i) {
      const { status, body } = await this.#playRequest();
      if (status !== 200) return null;
      this.#ws[i] = BigInt(body.realNumber);
    }

    const [ w1, w2, w3 ] = this.#ws;
    const inversed = modInverse(w1 - w2, this.#mod);
    if (typeof inversed !== 'bigint') return null;

    const mul = mod((w2 - w3) * inversed, this.#mod);
    const incr = mod(w3 - mul * w2, this.#mod);

    return [mul, incr];
  }

  async #playRequest() {
    return casinoAction({
      mode: 'Lcg',
      id: this.#account.id,
      bet: 1,
      number: 1,
    });
  }
}
