import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from 'ui';

import { Loader } from '.';

export default {
  title: 'UI/Loader',
  component: Loader,
  args: {
    height: 150,
  },
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => (
  <Container size="sm">
    <Loader {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
