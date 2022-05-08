import { ReactNode } from 'react';

import { ModalName } from 'domain/modal';

export interface Props {
  modalName: ModalName;
  slot: ReactNode;
}
