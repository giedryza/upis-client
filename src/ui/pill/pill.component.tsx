import { FC } from 'react';

import { Container, Content } from './atoms';
import { Props } from './pill.types';

export const Pill: FC<Props> = ({ label, title, actions, active, popover }) => {
  return (
    <Container label={label} active={active}>
      <Content title={title} actions={actions}>
        {popover}
      </Content>
    </Container>
  );
};
