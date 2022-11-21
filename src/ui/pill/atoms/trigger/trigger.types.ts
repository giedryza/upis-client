import { RefObject } from 'react';

export interface Props {
  label: string;
  isOpen: boolean;
  buttonRef: RefObject<HTMLButtonElement>;
}
