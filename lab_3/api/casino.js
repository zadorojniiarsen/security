import { makeRequest } from './utils.js';

export const casinoAction = ({ mode, bet, number, id }) => (
	makeRequest(`/play${mode}?id=${id}&bet=${bet}&number=${number}`)
);
