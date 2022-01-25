import { Filetype, FileTypeUnion } from 'types/common/files';

export type DragState = 'accept' | 'reject' | 'active' | 'inactive';

export interface Props {
  accept?: (`.${Filetype}` | FileTypeUnion)[];
  multiple?: boolean;
  maxSize?: number;
  name?: string;
  disabled?: boolean;
  onChange?: (files: File[]) => void;
}
