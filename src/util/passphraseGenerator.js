import { englishWords, numbers, symbols } from "./corpus.js";

export const defaultGeneratorOptions = {
  includeSymbols: false,
  includeNumbers: false,
  maxLength: 9, // max and min lengths of acceptable words
  minLength: 3,
  numWords: 3,
  randomlyCapitalize: false,
  separator: ""
};

const rng = Math.random; // TODO change this maybe

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
