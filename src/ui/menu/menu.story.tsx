import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Menu } from '.';

export default {
  title: 'UI/Menu',
  component: Menu,
  args: {
    sections: [
      {
        id: 'section-1',
        label: 'Section 1',
        items: [
          { id: 'edit', label: 'Edit' },
          { id: 'duplicate', label: 'Duplicate' },
        ],
      },
      {
        id: 'section-2',
        label: 'Section 2',
        items: [
          { id: 'move', label: 'Move' },
          { id: 'rename', label: 'Rename', disabled: true },
        ],
      },
      {
        id: 'section-3',
        items: [
          { id: 'archive', label: 'Archive' },
          { id: 'delete', label: 'Delete' },
        ],
      },
    ],
    label: 'Menu',
    ariaLabel: 'Aria menu',
  },
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
