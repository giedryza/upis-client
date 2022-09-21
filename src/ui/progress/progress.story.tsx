import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Progress } from '.';

export default {
  title: 'UI/Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => (
  <Progress {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  value: 25,
  min: 0,
  max: 100,
  formatOptions: { style: 'decimal' },
};
