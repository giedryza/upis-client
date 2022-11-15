import { FC, PropsWithChildren } from 'react';

import { Header } from 'components/layout';

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
