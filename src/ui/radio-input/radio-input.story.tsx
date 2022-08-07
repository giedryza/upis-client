import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RadioInput } from '.';

export default {
  title: 'UI/RadioInput',
  component: RadioInput,
  args: {
    label: 'Regionai',
    items: [
      { label: 'Aukštaitija', value: 'aukstaitija' },
      { label: 'Žemaitija', value: 'zemaitija' },
      { label: 'Suvalkija', value: 'suvalkija', disabled: true },
      { label: 'Dzūkiją', value: 'dzukija' },
      { label: 'Mažoji Lietuva', value: 'mazoji-lietuva' },
    ],
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as ComponentMeta<typeof RadioInput>;

const Template: ComponentStory<typeof RadioInput> = (args) => (
  <RadioInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
