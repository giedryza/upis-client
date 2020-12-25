import { FC } from 'react';

import { ModalProvider } from 'context/modal/modal.context';

export const GlobalContext: FC = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>;
};
