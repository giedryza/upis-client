import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LabeledValue } from '.';

export default {
  title: 'UI/LabeledValue',
  component: LabeledValue,
  args: {
    label: 'Description',
  },
} as ComponentMeta<typeof LabeledValue>;

const Template: ComponentStory<typeof LabeledValue> = (args) => (
  <LabeledValue {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  value: 'Baidarių nuoma Žemaitijoj',
};
