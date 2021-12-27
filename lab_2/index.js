import { readFile } from 'fs/promises';

const rowsCiphered = await readFile('ciphered.txt', 'utf8')
  .then(t => t.split('\r\n'));

const xorRows = (first, second) => first.map((ch, i) => ch ^ (second[i] ?? 0));

const xoredWithRows = rowsCiphered.map(rowKey => {
    const keyHex = Buffer.from(rowKey, 'hex');
    const xored = rowsCiphered.map(rowValue => {
        const valueHex = Buffer.from(rowValue, 'hex');
        const pseudoKey = xorRows(keyHex, valueHex);
        return xorRows(Buffer.from('For who would bear the wh'), pseudoKey).toString();
    });
    return xored;
});

const result = xoredWithRows.map(arr => arr[0]).join('\n');

console.log(result);
