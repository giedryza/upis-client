import { DragState } from './file-input.types';

import { FileType } from 'types/common/files';
import { IconName } from 'ui/icon/icon.component';

export const FILES_LIMIT = 5;

export const ICON_BY_FILETYPE: Record<FileType, IconName> = {
  'image/jpeg': IconName.FileJpg,
  'image/png': IconName.FilePng,
  'image/svg+xml': IconName.FilePng,
  'image/gif': IconName.FileGif,
  'image/bmp': IconName.FileBmp,
  'video/x-msvideo': IconName.FileAvi,
  'video/mp4': IconName.FileMp4,
  'video/mpeg': IconName.FileMpg,
  'audio/mpeg': IconName.FileMpg,
  'audio/wav': IconName.FileWav,
  'text/csv': IconName.FileTxt,
  'text/plain': IconName.FileTxt,
  'application/msword': IconName.FileDoc,
  'application/rtf': IconName.FileTxt,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    IconName.FileDocx,
  'application/pdf': IconName.FilePdf,
  'application/vnd.rar': IconName.FileRar,
  'application/vnd.ms-excel': IconName.FileXls,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    IconName.FileXlsx,
  'application/zip': IconName.FileZip,
};

export const ICON_BY_DRAG_STATE: Record<DragState, IconName> = {
  active: IconName.CirclePlus,
  inactive: IconName.CirclePlus,
  accept: IconName.CircleCheck,
  reject: IconName.CircleX,
};
