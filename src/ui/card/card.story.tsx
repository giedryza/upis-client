import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Card } from '.';

export default {
  title: 'UI/Card',
  component: Card,
  args: {},
  parameters: {
    backgrounds: {
      default: 'grey',
    },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
  <Card {...args}>
    <p>CONTENT</p>
  </Card>
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
