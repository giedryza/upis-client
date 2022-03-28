import { MouseEvent, TouchEvent } from 'react';

export interface Props {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'danger';
  onClose?: () => void;
  onMouseEnter?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void;
  onTouchStart?: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchEnd?: (e: TouchEvent<HTMLDivElement>) => void;
}
