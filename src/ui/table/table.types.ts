import { ReactNode } from 'react';

export interface Props<Accessor extends string = string> {
  rows: {
    id: string;
    content: Record<Accessor, ReactNode>;
  }[];
  columns: {
    accessor: Accessor;
    label: string;
    align?: 'left' | 'center' | 'right';
  }[];
}
