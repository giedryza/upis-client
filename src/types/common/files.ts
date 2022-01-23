export type FileType =
  | '.jpg'
  | '.jpeg'
  | '.svg'
  | '.gif'
  | '.bmp'
  | '.avi'
  | '.mp4'
  | '.mpeg'
  | '.mp3'
  | '.wav'
  | '.csv'
  | '.txt'
  | '.doc'
  | '.rtf'
  | '.json'
  | '.docx'
  | '.pdf'
  | '.rar'
  | '.zip'
  | '.xls'
  | '.xlsx';

export type FileTypeUnion =
  | 'image/*'
  | 'video/*'
  | 'audio/*'
  | 'text/*'
  | 'application/*';
