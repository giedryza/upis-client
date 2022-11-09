import { FC } from 'react';

import { Header } from 'components/layout';

export const AppLayout: FC = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
