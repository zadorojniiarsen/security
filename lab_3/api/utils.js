import { request } from 'http';
import { HOST, PORT, PATH } from './params.js';

const getOptions = route => ({
  host: HOST,
  port: PORT,
  method: 'GET',
  path: PATH + route,
});

const hanldeResponse = async res => {
	const bodyChunks = [];
	for await (const chunk of res) bodyChunks.push(chunk);
	const body = Buffer.concat(bodyChunks).toString();
	return {
		status: res.statusCode,
		body: JSON.parse(body),
	};
};

export const makeRequest = route => new Promise((res, rej) => {
	const options = getOptions(route);
	const clientReq = request(options, r => res(hanldeResponse(r)));
	clientReq
		.on('error', rej)
		.on('timeout', rej)
		.end();
});
