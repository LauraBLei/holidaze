/**
 * Smoothly scrolls to a element and focuses it.
 *
 * @param id - The HTML id of the element to scroll to
 */

export function scrollToElement(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    element.focus?.();
  }
}
