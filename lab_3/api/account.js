import { makeRequest } from './utils.js';

export const createAccount = (id = 0) => makeRequest('/createacc?id=' + id);
