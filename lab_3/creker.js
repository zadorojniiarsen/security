import { casinoAction } from './api/casino.js';
import { modInverse } from './modInverse.js';

export default class Creker {
  #account = null;
  #ws = Array.from({ length: 3 });
  #mod = 2 ** 32;

  constructor(account) {
    this.#account = account;
  }

  async run() {
    let modInversed;
    while (true) {
      await this.#fillWs();
      const [ a1, a2 ] = this.#ws;
      const inverted = modInverse(a2 - a1, this.#mod)
      console.log('cjto u was sdes proishodi', inverted)
      if (isNaN(inverted)) break;
      modInversed = inverted;
    }

    const [ s1, s2, s3 ] = this.#ws;
    const a = Math.floor(((s2 - s1) * modInv) % this.#mod);
    const c = Math.floor((s3 - s2 * a) % this.#mod);

    console.log({ a, c });

    const result = await this.#makeBet(a, c, s3)
    this.#account = result.account;

    console.log({ result });
  }

  async #fillWs() {
    const queryParams = this.#getQueryParams();
    for (let i = 0; i < this.#ws.length; i++) {
      const { status, body } = await casinoAction(queryParams);
      if (status === 400) throw new Error(JSON.stringify(body));
      this.#ws[i] = body.realNumber;
    }
  }

  async #makeBet(a, c, s3) {
    const bet = this.#account.money / 0.5;
    const w = Math.floor(a * (result?.realNumber ?? s3) + c) % this.#mod;
    return casinoAction(this.#getQueryParams(bet, w));
  }

  #getQueryParams(bet = 1, number = 1) {
    return {
      bet,
      number,
      mode: 'Lcg',
      id: this.#account.id,
    };
  }
}
