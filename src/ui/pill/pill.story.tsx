import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Pill } from '.';

export default {
  title: 'UI/Pill',
  component: Pill,
  args: {
    label: 'Open Popover',
    title: 'Popover title',
    popover: (
      <div>
        This is the content of the popover.
        <button type="button">but1</button>
        <button type="button">but2</button>
        <button type="button">but3</button>
      </div>
    ),
  },
} as ComponentMeta<typeof Pill>;

const Template: ComponentStory<typeof Pill> = (args) => <Pill {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
