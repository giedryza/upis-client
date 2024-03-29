import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CheckboxGroupInput } from '.';

export default {
  title: 'UI/CheckboxGroupInput',
  component: CheckboxGroupInput,
  args: {
    label: 'Regionai',
    items: [
      { label: 'Aukštaitija', value: 'aukstaitija' },
      { label: 'Žemaitija', value: 'zemaitija' },
      { label: 'Suvalkija', value: 'suvalkija', disabled: true },
      { label: 'Dzūkiją', value: 'dzukija', readonly: true },
      { label: 'Mažoji Lietuva', value: 'mazoji-lietuva' },
    ],
  },
} as ComponentMeta<typeof CheckboxGroupInput>;

const Template: ComponentStory<typeof CheckboxGroupInput> = (args) => (
  <CheckboxGroupInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
