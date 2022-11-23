import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Pill } from '.';

export default {
  title: 'UI/Pill',
  component: Pill,
  args: {
    label: 'Amenities',
    title: 'Amenities',
    popover: (
      <p>
        In publishing and graphic design, Lorem ipsum is a placeholder text
        commonly used to demonstrate the visual form of a document or a typeface
        without relying on meaningful content. Lorem ipsum may be used as a
        placeholder before final copy is available.
      </p>
    ),
    actions: [
      {
        label: 'Clear',
        variant: 'ghost',
      },
      {
        label: 'Apply',
        variant: 'primary',
        closable: true,
      },
    ],
  },
} as ComponentMeta<typeof Pill>;

const Template: ComponentStory<typeof Pill> = (args) => (
  <div style={{ display: 'flex', gap: 10 }}>
    <Pill {...args} />
    <Pill {...args} label="Rivers" title="Rivers" active />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
