// urlParser.js

export function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('category');
}