import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Meter } from '.';

export default {
  title: 'UI/Meter',
  component: Meter,
  args: {
    label: 'Difficulty',
  },
} as ComponentMeta<typeof Meter>;

const Template: ComponentStory<typeof Meter> = (args) => <Meter {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  value: 1.5,
  min: 0,
  max: 5,
  formatOptions: { style: 'decimal' },
};
