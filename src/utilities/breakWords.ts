/**
 * Checks if the provided text contains any single word longer than 30 characters.
 *
 * This can be used to determine whether word-breaking CSS styles like `break-all`
 * should be applied to avoid layout issues caused by long, unbroken words.
 *
 * @param {string} text - The text to evaluate.
 * @returns {boolean} Returns `true` if any word is longer than 30 characters, otherwise `false`.
 */

export function breakWords(text: string) {
  const words = text?.split(' ') ?? [];
  const hasLongWord = words.some((word) => word.length > 30);

  return hasLongWord;
}
