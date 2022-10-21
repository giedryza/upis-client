export const toExternalLink = (url: string): string =>
  url.startsWith('http') ? url : `//${url}`;
