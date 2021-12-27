import { readFile, writeFile } from 'fs/promises';

const firstPartCiphered = '7958401743454e1756174552475256435e59501a5c524e176f786517545e475f5245191772195019175e4317445f58425b531743565c521756174443455e595017d5b7ab5f525b5b58174058455b53d5b7aa175659531b17505e41525917435f52175c524e175e4417d5b7ab5c524ed5b7aa1b174f584517435f5217515e454443175b524343524517d5b7ab5fd5b7aa17405e435f17d5b7ab5cd5b7aa1b17435f5259174f584517d5b7ab52d5b7aa17405e435f17d5b7ab52d5b7aa1b17435f525917d5b7ab5bd5b7aa17405e435f17d5b7ab4ed5b7aa1b1756595317435f5259174f58451759524f4317545f564517d5b7ab5bd5b7aa17405e435f17d5b7ab5cd5b7aa175650565e591b17435f525917d5b7ab58d5b7aa17405e435f17d5b7ab52d5b7aa1756595317445817585919176e5842175a564e17424452175659175e5953524f1758511754585e59545e53525954521b177f565a5a5e595017535e4443565954521b177c56445e445c5e17524f565a5e5956435e58591b17444356435e44435e54565b17435244434417584517405f564352415245175a52435f5853174e5842175152525b174058425b5317445f584017435f52175552444317455244425b4319';
const secondPartСiphered = Buffer.from('G0IFOFVMLRAPI1QJbEQDbFEYOFEPJxAfI10JbEMFIUAAKRAfOVIfOFkYOUQFI15ML1kcJFUeYhA4IxAeKVQZL1VMOFgJbFMDIUAAKUgFOElMI1ZMOFgFPxADIlVMO1VMO1kAIBAZP1VMI14ANRAZPEAJPlMNP1VMIFUYOFUePxxMP19MOFgJbFsJNUMcLVMJbFkfbF8CIElMfgZNbGQDbFcJOBAYJFkfbF8CKRAeJVcEOBANOUQDIVEYJVMNIFwVbEkDORAbJVwAbEAeI1INLlwVbF4JKVRMOF9MOUMJbEMDIVVMP18eOBADKhALKV4JOFkPbFEAK18eJUQEIRBEO1gFL1hMO18eJ1UIbEQEKRAOKUMYbFwNP0RMNVUNPhlAbEMFIUUALUQJKBANIl4JLVwFIldMI0JMK0INKFkJIkRMKFUfL1UCOB5MH1UeJV8ZP1wVYBAbPlkYKRAFOBAeJVcEOBACI0dAbEkDORAbJVwAbF4JKVRMJURMOF9MKFUPJUAEKUJMOFgJbF4JNERMI14JbFEfbEcJIFxCbHIJLUJMJV5MIVkCKBxMOFgJPlVLPxACIxAfPFEPKUNCbDoEOEQcPwpDY1QDL0NCK18DK1wJYlMDIR8II1MZIVUCOB8IYwEkFQcoIB1ZJUQ1CAMvE1cHOVUuOkYuCkA4eHMJL3c8JWJffHIfDWIAGEA9Y1UIJURTOUMccUMELUIFIlc=', 'base64').toString();
const thirdPartCyphered = "EFFPQLEKVTVPCPYFLMVHQLUEWCNVWFYGHYTCETHQEKLPVMSAKSPVPAPVYWMVHQLUSPQLYWLASLFVWPQLMVHQLUPLRPSQLULQESPBLWPCSVRVWFLHLWFLWPUEWFYOTCMQYSLWOYWYETHQEKLPVMSAKSPVPAPVYWHEPPLUWSGYULEMQTLPPLUGUYOLWDTVSQETHQEKLPVPVSMTLEUPQEPCYAMEWWYTYWDLUULTCYWPQLSEOLSVOHTLUYAPVWLYGDALSSVWDPQLNLCKCLRQEASPVILSLEUMQBQVMQCYAHUYKEKTCASLFPYFLMVHQLUPQLHULIVYASHEUEDUEHQBVTTPQLVWFLRYGMYVWMVFLWMLSPVTTBYUNESESADDLSPVYWCYAMEWPUCPYFVIVFLPQLOLSSEDLVWHEUPSKCPQLWAOKLUYGMQEUEMPLUSVWENLCEWFEHHTCGULXALWMCEWETCSVSPYLEMQYGPQLOMEWCYAGVWFEBECPYASLQVDQLUYUFLUGULXALWMCSPEPVSPVMSBVPQPQVSPCHLYGMVHQLUPQLWLRPOEDVMETBYUFBVTTPENLPYPQLWLRPTEKLWZYCKVPTCSTESQPBYMEHVPETCMEHVPETZMEHVPETKTMEHVPETCMEHVPETT"

const splitBySize = (str, size = 1) => {
  const matchPattern = new RegExp(`.{1,${size}}`, 'g');
  return str.match(matchPattern);
};

const frequencyAnalyzer = (text, fragmentLength) => {
  const frequencies = splitBySize(text, fragmentLength).reduce((obj, chunk) => {
    obj[chunk] ??= 0;
    ++obj[chunk];
    return obj;
  }, {});
  
  return Object.entries(frequencies).sort((x, y) => y[1] - x[1]);
};

const determineTextSimilarity = (first, second) => {
  let similarities = 0;
  for (let i = 0; i < first.length; ++i)
    similarities += first[i] === second[i];
  return similarities;
};

const shiftText = (value, shiftBy) => {
  const { length: size } = value;
  const bound = size - shiftBy;
  return value.substring(bound, size) + value.substring(0, bound);
};

// Частина один (homecumming)

/* 
Розбиваємо по 8 символів,
Кожен блок переводимо з двоїчної в десяткову систему числення
Розшифровуємо по base64
Отримали текст лаби
*/

const startingTextCiphered = await readFile('startings_cipher.txt', 'utf8');
const startingTextDeciphered = Buffer.from(splitBySize(startingTextCiphered, 8)
  .reduce((acc, val) => acc + String.fromCharCode(parseInt(val, 2)), ''), 'base64').toString();

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
    const key = 55;
    const parsed = parseInt(ch, format);
    const deciphered = parsed ^ key;
    return deciphered.toString(format);
  }).join(''), 'hex').toString();


// Частина два (far away from homies)

/* 
  Шукаємо довжину ключа за допомогою здвига і отримуємо значення 3
  Брут форсом находимо можливі значення ключа
  Розшифровуємо текст найденним ключем
*/

const Coincidences = determineTextSimilarity(secondPartСiphered, shiftText(secondPartСiphered, 7));

const decryptXorVigner = (encryptedText, key) => {
    let fullKey = '';
    let decrypted = '';

    while (true) {
      fullKey += key;

      if (fullKey.length > encryptedText.length) break;
    }

    for (let i = 0; i < encryptedText.length; i++) {
      decrypted += String.fromCharCode(encryptedText.charCodeAt(i) ^ fullKey.charCodeAt(i))
    }
    //return encryptedText.split('').reduce((acc, val) => acc += String.fromCharCode(val.charCodeAt(0) ^ fullKey.charCodeAt(0)), '');

    return decrypted;
}

const bruteForceThreeDigitKey = encryptedText => {
  const possibleVariants = {}

  for (let i = 1; i <= 255; i++) {
      for (let j = 1; j <= 255; j++) {
          for (let k = 1; k <= 255; k++) {
              const key = String.fromCharCode(i) + String.fromCharCode(j) + String.fromCharCode(k);
              const decrypted = decryptXorVigner(encryptedText, key);
              if (decrypted.toLowerCase().includes(cipher)) possibleVariants[key] = decrypted;
          }
      }
  }
}

/* const possibleVariants = bruteForceThreeDigitKey(secondPartСiphered) */
const realKey = String.fromCharCode(76) + String.fromCharCode(48) + String.fromCharCode(108);
const secondPartDecrypted = decryptXorVigner(secondPartСiphered, realKey);

// Частина три (far away from homies)

/* 
 За допомогою аналізу частоти знаходимо буквам відповідність
*/

const replacementTable = {
  'L': 'E',
  'P': 'T',
  'Q': 'H',
  'U': 'R',
  'M': 'C',
  'V': 'I',
  'H': 'P',
  'E': 'A',
  'S': 'S',
  'T': 'L',
  'R': 'X',
  'B': 'W',
  'W': 'N',
  'C': 'Y',
  'Y': 'O',
  'A': 'U',
  'K': 'B',
  'F': 'D',
  'D': 'G',
  'G': 'F',
  'I': 'V',
  'N': 'K',
  'O': 'M',
  'X': 'Q',
  'Z': 'J'
};

const replaceLetters = (text, replacementTable) => {
    return text.split('').map(c => replacementTable[c]).join('');
}

const lettersFrequency = console.log(frequencyAnalyzer(thirdPartCyphered))
const bigramsFrequency = console.log(frequencyAnalyzer(thirdPartCyphered, 2))
const threegramsFrequency = frequencyAnalyzer(thirdPartCyphered, 3)
const thirdPartDecrypted = replaceLetters(thirdPartCyphered, replacementTable)

