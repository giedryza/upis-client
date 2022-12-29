export const normalizeString = (string: string) =>
  string
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
