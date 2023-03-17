import { TreeState } from 'react-stately';
import type { Node } from '@react-types/shared';

export interface Props<T> {
  item: Node<T>;
  state: TreeState<T>;
}
