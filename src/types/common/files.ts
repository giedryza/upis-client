export const filetypes = [
  'jpg',
  'jpeg',
  'png',
  'avif',
  'svg',
  'gif',
  'bmp',
  'avi',
  'mp4',
  'mpeg',
  'mp3',
  'wav',
  'csv',
  'txt',
  'doc',
  'rtf',
  'json',
  'docx',
  'pdf',
  'rar',
  'zip',
  'xls',
  'xlsx',
] as const;

export type Filetype = (typeof filetypes)[number];

export interface AppFile {
  _id: string;
  url: string;
  key: string;
  contentType: string;
  description: string;
}
