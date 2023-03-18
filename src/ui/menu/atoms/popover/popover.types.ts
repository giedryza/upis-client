import { AriaPopoverProps } from 'react-aria';
import { OverlayTriggerState } from 'react-stately';

export interface Props extends Omit<AriaPopoverProps, 'popoverRef'> {
  state: OverlayTriggerState;
}
