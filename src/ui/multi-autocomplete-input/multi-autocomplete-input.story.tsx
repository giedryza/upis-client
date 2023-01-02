import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MultiAutocompleteInput } from '.';

export default {
  title: 'UI/MultiAutocompleteInput',
  component: MultiAutocompleteInput,
  args: {
    label: 'Rivers',
    items: [
      { label: 'Harper Lee', value: '1' },
      { label: 'Lev Tolstoy', value: '2' },
      { label: 'Grig Bale', value: '3' },
      { label: 'Oscar Wilde', value: '4' },
      { label: 'George Orwell', value: '5' },
      { label: 'Jane Austen', value: '6' },
      { label: 'Marcus Aurelius', value: '7' },
      { label: 'Gareth Ronald', value: '8' },
      { label: 'Fyodor Dostoevsky', value: '9' },
    ],
    value: ['2', '4'],
  },
} as ComponentMeta<typeof MultiAutocompleteInput>;

const Template: ComponentStory<typeof MultiAutocompleteInput> = (args) => (
  <MultiAutocompleteInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
