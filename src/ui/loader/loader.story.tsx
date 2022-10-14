import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Loader } from '.';

export default {
  title: 'UI/Loader',
  component: Loader,
  args: {
    width: 150,
    height: 150,
  },
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Loader {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
