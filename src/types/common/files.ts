export type FileType =
  | 'image/jpeg'
  | 'image/png'
  | 'image/svg+xml'
  | 'image/gif'
  | 'image/bmp'
  | 'video/x-msvideo'
  | 'video/mp4'
  | 'video/mpeg'
  | 'audio/mpeg'
  | 'audio/wav'
  | 'text/csv'
  | 'text/plain'
  | 'application/msword'
  | 'application/rtf'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/pdf'
  | 'application/vnd.rar'
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'application/zip';

export type FileTypeUnion =
  | 'image/*'
  | 'video/*'
  | 'audio/*'
  | 'text/*'
  | 'application/*';
