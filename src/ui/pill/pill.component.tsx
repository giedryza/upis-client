import { FC } from 'react';

import { Container, Content } from './atoms';
import { Props } from './pill.types';

export const Pill: FC<Props> = ({ label, title, actions, popover }) => {
  return (
    <Container label={label}>
      <Content title={title} actions={actions}>
        {popover}
      </Content>
    </Container>
  );
};
