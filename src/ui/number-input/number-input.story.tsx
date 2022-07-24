import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NumberInput } from '.';

export default {
  title: 'UI/NumberInput',
  component: NumberInput,
  args: {
    label: 'Price',
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as ComponentMeta<typeof NumberInput>;

const Template: ComponentStory<typeof NumberInput> = (args) => (
  <NumberInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  stepper: true,
};
