import { readFileSync, writeFileSync } from 'fs';

const firstPartCiphered = '7958401743454e1756174552475256435e59501a5c524e176f786517545e475f5245191772195019175e4317445f58425b531743565c521756174443455e595017d5b7ab5f525b5b58174058455b53d5b7aa175659531b17505e41525917435f52175c524e175e4417d5b7ab5c524ed5b7aa1b174f584517435f5217515e454443175b524343524517d5b7ab5fd5b7aa17405e435f17d5b7ab5cd5b7aa1b17435f5259174f584517d5b7ab52d5b7aa17405e435f17d5b7ab52d5b7aa1b17435f525917d5b7ab5bd5b7aa17405e435f17d5b7ab4ed5b7aa1b1756595317435f5259174f58451759524f4317545f564517d5b7ab5bd5b7aa17405e435f17d5b7ab5cd5b7aa175650565e591b17435f525917d5b7ab58d5b7aa17405e435f17d5b7ab52d5b7aa1756595317445817585919176e5842175a564e17424452175659175e5953524f1758511754585e59545e53525954521b177f565a5a5e595017535e4443565954521b177c56445e445c5e17524f565a5e5956435e58591b17444356435e44435e54565b17435244434417584517405f564352415245175a52435f5853174e5842175152525b174058425b5317445f584017435f52175552444317455244425b4319';
const secondPartCiphered = 'G0IFOFVMLRAPI1QJbEQDbFEYOFEPJxAfI10JbEMFIUAAKRAfOVIfOFkYOUQFI15ML1kcJFUeYhA4IxAeKVQZL1VMOFgJbFMDIUAAKUgFOElMI1ZMOFgFPxADIlVMO1VMO1kAIBAZP1VMI14ANRAZPEAJPlMNP1VMIFUYOFUePxxMP19MOFgJbFsJNUMcLVMJbFkfbF8CIElMfgZNbGQDbFcJOBAYJFkfbF8CKRAeJVcEOBANOUQDIVEYJVMNIFwVbEkDORAbJVwAbEAeI1INLlwVbF4JKVRMOF9MOUMJbEMDIVVMP18eOBADKhALKV4JOFkPbFEAK18eJUQEIRBEO1gFL1hMO18eJ1UIbEQEKRAOKUMYbFwNP0RMNVUNPhlAbEMFIUUALUQJKBANIl4JLVwFIldMI0JMK0INKFkJIkRMKFUfL1UCOB5MH1UeJV8ZP1wVYBAbPlkYKRAFOBAeJVcEOBACI0dAbEkDORAbJVwAbF4JKVRMJURMOF9MKFUPJUAEKUJMOFgJbF4JNERMI14JbFEfbEcJIFxCbHIJLUJMJV5MIVkCKBxMOFgJPlVLPxACIxAfPFEPKUNCbDoEOEQcPwpDY1QDL0NCK18DK1wJYlMDIR8II1MZIVUCOB8IYwEkFQcoIB1ZJUQ1CAMvE1cHOVUuOkYuCkA4eHMJL3c8JWJffHIfDWIAGEA9Y1UIJURTOUMccUMELUIFIlc=';

const splitBySize = (str, size = 1) => {
  const matchPattern = new RegExp(`.{1,${size}}`, 'g');
  return str.match(matchPattern);
};

const frequencyAnalyzer = (text, fragmentLength) => {
  const frequencies = splitBySize(text, fragmentLength)
    .reduce((obj, chunk) => {
      obj[chunk] ??= 0;
      ++obj[chunk];
      return obj;
    }, {});

  return Object.entries(frequencies).sort((x, y) => y[1] - x[1]);
};

/* 
  Розбиваємо по 8 символів,
  Кожен блок переводимо з двоїчної в десяткову систему числення
  Розшифровуємо по base64
  Отримали текст лаби
 */

const startingTextCiphered = readFileSync('startings_cipher.txt', 'utf8');
const startingTextDeciphered = Buffer.from(splitBySize(startingTextCiphered, 8)
  .reduce((acc, val) => acc + String.fromCharCode(parseInt(val, 2)), ''), 'base64').toString();

// console.log(startingTextDeciphered)

writeFileSync("task.txt", startingTextDeciphered);

/* 
  Розбиваємо отриманний текст по два символи
  Переводимо в шістнатсядкову систему числелення
  Робимо аналіз частоти
  Здогадуємось що найчастіше зустрічається пробіл
  Переводимо 17 в шістнадцяткову систему числення
  Ксоримо з кодом пробілу
  Отримуємо ключ 55 
  Розшифровуємо за ключом
  Переводимо в utf-8
*/


const firstPartDeciphered = Buffer.from(
  splitBySize(firstPartCiphered, 2).map(ch => {
    const format = 16;
    const parsed = parseInt(ch, format);
    const deciphered = parsed ^ 55;
    return deciphered.toString(format);
  }).join(''), 'hex').toString();

console.log(firstPartDeciphered)

