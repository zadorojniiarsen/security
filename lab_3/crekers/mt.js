import { casinoAction } from "../api/casino";

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

    // TODO: possible value search loop

    return null;
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
