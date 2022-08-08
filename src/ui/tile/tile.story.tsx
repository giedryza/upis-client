import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tile } from '.';

export default {
  title: 'UI/Tile',
  component: Tile,
  args: {
    icon: 'pin',
    title: 'Transportavimas',
    subtitle:
      'Transportavimas gali užtrukt nei daug, nei mažai - priklausomai nuo pasirinkimo.',
    fields: [
      {
        label: 'Price',
        sublabel: '€10.00 už km',
      },
    ],
    actions: [
      { label: 'Edit', icon: 'pencil', variant: 'secondary' },
      { label: 'Delete', icon: 'trash', variant: 'ghost' },
    ],
  },
} as ComponentMeta<typeof Tile>;

const Template: ComponentStory<typeof Tile> = (args) => <Tile {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
