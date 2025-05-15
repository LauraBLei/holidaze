export function applyBreakWordClass(element: HTMLElement) {
  const words = element.textContent?.split(' ') ?? [];
  const hasLongWord = words.some((word) => word.length > 30);

  if (hasLongWord) {
    element.classList.add('break-all');
  } else {
    element.classList.add('break-words');
  }
}
