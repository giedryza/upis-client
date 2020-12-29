import { FC } from 'react';

import { ModalProvider } from 'domain/modal/modal.context';
import { DropdownProvider } from 'domain/dropdown/dropdown.context';

export const GlobalContext: FC = ({ children }) => {
  return (
    <DropdownProvider>
      <ModalProvider>{children}</ModalProvider>
    </DropdownProvider>
  );
};
