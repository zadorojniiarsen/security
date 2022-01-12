import { createAccount } from './api/account.js';
import { casinoAction } from './api/casino.js';
import { modInverse } from './modInverse.js';
import Creker from './creker.js';

let account;
let id = 10000;

while (!account) {
  const resCur = await createAccount(id++);
  console.log(id)
  if (resCur.status !== 409) account = resCur.body;
}
const creker = new Creker(account);

try{
  await creker.run()
} catch (e) {
  console.log(e.message);
}
  

