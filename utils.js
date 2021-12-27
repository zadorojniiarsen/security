export const splitBySize = (str, size = 1) => {
  const matchPattern = new RegExp(`.{1,${size}}`, 'g');
  return str.match(matchPattern);
};

export const frequencyAnalyzer = (text, fragmentLength) => {
  const frequencies = splitBySize(text, fragmentLength).reduce((obj, chunk) => {
    obj[chunk] ??= 0;
    ++obj[chunk];
    return obj;
  }, {});
  
  return Object.entries(frequencies).sort((x, y) => y[1] - x[1]);
};

export const determineTextSimilarity = (first, second) => {
  let similarities = 0;
  for (let i = 0; i < first.length; ++i)
    similarities += first[i] === second[i];
  return similarities;
};

export const shiftText = (value, shiftBy) => {
  const { length: size } = value;
  const bound = size - shiftBy;
  return value.substring(bound, size) + value.substring(0, bound);
};