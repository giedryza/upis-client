import { FileType, FileTypeUnion } from 'types/common/files';

export type DragState = 'accept' | 'reject' | 'active' | 'inactive';

export interface Props {
  filename?: string;
  filetype?: FileType;
  accept?: (FileType | FileTypeUnion)[];
  multiple?: boolean;
  maxSize?: number;
  attributes?: Omit<
    JSX.IntrinsicElements['input'],
    'className' | 'onChange' | 'multiple' | 'style'
  >;
  onChange: (files: File[]) => void;
}
