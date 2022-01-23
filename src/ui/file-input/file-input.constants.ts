import { DragState } from './file-input.types';

import { IconName } from 'ui/icon/icon.component';

export const FILES_LIMIT = 5;

export const ICON_BY_DRAG_STATE: Record<DragState, IconName> = {
  active: IconName.CirclePlus,
  inactive: IconName.CirclePlus,
  accept: IconName.CircleCheck,
  reject: IconName.CircleX,
};
