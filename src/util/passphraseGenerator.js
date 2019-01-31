import { englishWords, numbers, symbols } from "./corpus.js";

export const defaultGeneratorOptions = {
  includeSymbols: false,
  includeNumbers: false,
  maxLength: 9, // max and min lengths of acceptable words
  minLength: 3,
  numWords: 3,
  randomlyCapitalize: false,
  separator: "",
};

const hasWindowCryptoAPI = window.crypto && window.crypto.getRandomValues;
if (!hasWindowCryptoAPI) {
  console.error(`Error, can't access window crypto api!`);
}

// from https://stackoverflow.com/questions/13694626/generating-random-numbers-0-to-1-with-crypto-generatevalues
// returns randomness between 0 and 1
const rng = () => {
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  // convert to randomness between 0 and 1
  const randomNumber = randomBuffer[0] / (0xffffffff + 1);
  return randomNumber;
};

export function generate(options = {}) {
  const config = { ...defaultGeneratorOptions, ...options };
  const randomWords = [];
  while (randomWords.length < config.numWords) {
    let newWord = englishWords[Math.floor(rng() * englishWords.length)];
    if (
      newWord.length >= config.minLength &&
      newWord.length <= config.maxLength
    ) {
      if (config.randomlyCapitalize) {
        newWord = newWord
          .split("")
          .map(c => (rng() >= 0.5 ? c.toUpperCase() : c))
          .join("");
      }
      if (config.includeNumbers) {
        do {
          const randomPosition = Math.floor(rng() * newWord.length);
          const randomIndex = Math.floor(rng() * numbers.length);
          newWord =
            newWord.slice(0, randomPosition) +
            numbers[randomIndex] +
            newWord.slice(randomPosition);
        } while (rng() > 0.8);
      }
      if (config.includeSymbols) {
        do {
          const randomPosition = Math.floor(rng() * newWord.length);
          const randomIndex = Math.floor(rng() * symbols.length);
          newWord =
            newWord.slice(0, randomPosition) +
            symbols[randomIndex] +
            newWord.slice(randomPosition);
        } while (rng() > 0.8);
      }
      randomWords.push(newWord);
    }
  }
  return randomWords.join(config.separator);
}

export default generate;
