import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SliderInput } from '.';

export default {
  title: 'UI/SliderInput',
  component: SliderInput,
  args: {
    label: 'Difficulty',
  },
} as ComponentMeta<typeof SliderInput>;

const Template: ComponentStory<typeof SliderInput> = (args) => (
  <SliderInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
