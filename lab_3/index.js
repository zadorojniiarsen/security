import { createAccount } from './api/account.js';
import CrekerLCG from './crekers/lcg.js';
import CrekerMT from './crekers/mt.js';

let account;
let id = 20000;

while (!account) {
  const resCur = await createAccount(id++);
  console.log('Searched id:', id)
  if (resCur.status !== 409) account = resCur.body;
}

console.log('Available account:', account);

const crekerFactories = {
  lcg: CrekerLCG,
  mt: CrekerMT,
};

for (const crekerType in crekerFactories) {
  const Factory = crekerFactories[crekerType];
  const creker = new Factory(account);
  const result = await creker.run();
  console.log({ crekerType, result });
}
