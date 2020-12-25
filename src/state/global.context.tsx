import { FC } from 'react';

import { ModalProvider } from 'state/modal/modal.context';

export const GlobalContext: FC = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>;
};
