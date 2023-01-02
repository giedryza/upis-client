import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SliderInput } from '.';

export default {
  title: 'UI/SliderInput',
  component: SliderInput,
  args: {
    label: 'Difficulty',
  },
} as ComponentMeta<typeof SliderInput>;

const Template: ComponentStory<typeof SliderInput> = (args) => {
  const [value, setValue] = useState<[number, number]>([5, 25]);

  return <SliderInput {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
