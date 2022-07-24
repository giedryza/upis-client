import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from '.';

export default {
  title: 'UI/Container',
  component: Container,
  args: {},
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = (args) => (
  <Container {...args}>
    <div style={{ backgroundColor: 'deepskyblue', height: 200 }} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
