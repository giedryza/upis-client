import { RefObject } from 'react';
import { OverlayTriggerState } from 'react-stately';

export interface Props {
  state: OverlayTriggerState;
  triggerRef: RefObject<HTMLButtonElement>;
}
