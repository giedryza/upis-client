import { EditInfoVariant } from './edit-info.types';

import { IconName } from 'ui/icon/icon.component';

export const ICON_BY_VARIANT: Record<EditInfoVariant, IconName> = {
  add: IconName.Plus,
  edit: IconName.Pencil,
};
