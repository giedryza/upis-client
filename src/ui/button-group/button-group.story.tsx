import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ButtonGroup } from '.';

export default {
  title: 'UI/ButtonGroup',
  component: ButtonGroup,
  args: {
    ariaLabel: 'Results',
    items: [
      { label: 'Map', value: 'map', icon: 'globe' },
      { label: 'Random', value: 'random' },
      { label: 'List', value: 'list' },
    ],
  },
} as ComponentMeta<typeof ButtonGroup>;

const Template: ComponentStory<typeof ButtonGroup> = (args) => (
  <ButtonGroup {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
