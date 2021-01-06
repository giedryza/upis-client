import { FC } from 'react';

import { ModalProvider } from 'domain/modal/modal.context';
import { DropdownProvider } from 'domain/dropdown/dropdown.context';
import { AuthProvider } from 'domain/auth/auth.context';

export const GlobalContext: FC = ({ children }) => {
  return (
    <AuthProvider>
      <DropdownProvider>
        <ModalProvider>{children}</ModalProvider>
      </DropdownProvider>
    </AuthProvider>
  );
};
