export async function waitForDOMLoading() {
  if (document.readyState !== 'loading') return;
  return new Promise((resolve) => document.addEventListener('DOMContentLoaded', resolve));
}
