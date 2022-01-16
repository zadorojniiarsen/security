import { createAccount } from './api/account.js';
import CrekerLCG from './crekers/lcg.js';

let account;
let id = 10000;

while (!account) {
  const resCur = await createAccount(id++);
  console.log(id)
  if (resCur.status !== 409) account = resCur.body;
}


const lcg = new CrekerLCG(account);
const result = await lcg.run();
console.log(result);

  

