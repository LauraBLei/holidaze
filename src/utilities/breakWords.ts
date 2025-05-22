export function applyBreakWordClass(text: string) {
  const words = text?.split(' ') ?? [];
  const hasLongWord = words.some((word) => word.length > 30);

  return hasLongWord;
}
