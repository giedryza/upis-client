import { Filetype } from 'types/common';

export const FILES_LIMIT = 5;

export const MIME_TYPE_BY_FILE: Record<Filetype, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  gif: 'image/gif',
  bmp: 'image/bmp',
  avi: 'video/x-msvideo',
  mp4: 'video/mp4',
  mpeg: 'video/mpeg',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  csv: 'text/csv',
  txt: 'text/plain',
  doc: 'application/msword',
  rtf: 'application/rtf',
  json: 'application/json',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pdf: 'application/pdf',
  rar: 'application/vnd.rar',
  zip: 'application/zip',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};
