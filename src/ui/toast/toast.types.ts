import { MouseEvent, ReactNode, TouchEvent } from 'react';

import { Status } from 'types/common';

export interface Props {
  message: ReactNode;
  type?: Status;
  onClose?: () => void;
  onMouseEnter?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void;
  onTouchStart?: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchEnd?: (e: TouchEvent<HTMLDivElement>) => void;
}
