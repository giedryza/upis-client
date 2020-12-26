import { FC } from 'react';

import { ModalProvider } from 'state/modal/modal.context';
import { DropdownProvider } from 'state/dropdown/dropdown.context';

export const GlobalContext: FC = ({ children }) => {
  return (
    <DropdownProvider>
      <ModalProvider>{children}</ModalProvider>
    </DropdownProvider>
  );
};
