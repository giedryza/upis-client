import { TreeState } from 'react-stately';
import type { Node } from '@react-types/shared';

import { Item } from '../../menu.types';

export interface Props<T> {
  item: Node<Item>;
  state: TreeState<T>;
}
