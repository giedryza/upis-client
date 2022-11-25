import { Breakpoint } from 'types/common';

export type Sizes =
  | Record<'width' | 'height', number>
  | Record<Breakpoint | 'default', number>;

export interface Props {
  sizes: Sizes;
}
