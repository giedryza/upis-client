import { ForwardedRef, RefObject } from 'react';
import { SliderState } from 'react-stately';

export interface Props {
  state: SliderState;
  trackRef: RefObject<HTMLDivElement>;
  forwardedRef: ForwardedRef<HTMLInputElement>;
  index: number;
  disabled: boolean;
}
