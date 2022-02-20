import { Filetype } from 'types/common/files';

export type DragState = 'accept' | 'reject' | 'active' | 'inactive';

export interface Props {
  accept?: Filetype[];
  multiple?: boolean;
  maxSize?: number;
  name?: string;
  disabled?: boolean;
  onChange?: (files: File[]) => void;
}
