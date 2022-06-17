import { RefObject } from 'react';
import { SliderState } from 'react-stately';

export interface Props {
  state: SliderState;
  trackRef: RefObject<HTMLDivElement>;
  index: number;
  disabled: boolean;
}
