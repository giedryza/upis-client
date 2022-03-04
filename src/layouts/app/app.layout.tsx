import { FC } from 'react';

import { Header } from 'components/header/header.component';

export const AppLayout: FC = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
