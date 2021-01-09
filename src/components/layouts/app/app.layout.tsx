import { FC } from 'react';

import { Header } from 'components/header/header.component';

const AppLayout: FC = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export { AppLayout };
