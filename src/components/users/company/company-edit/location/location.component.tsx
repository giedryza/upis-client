import { VFC } from 'react';

import { ComponentProps } from './location.types';

export const Location: VFC<ComponentProps> = ({ companyId }) => {
  return (
    <div>
      <h1>{companyId}</h1>
    </div>
  );
};
