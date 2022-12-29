import { ComponentStory, ComponentMeta } from '@storybook/react';

import { InView } from '.';

export default {
  title: 'UI/InView',
  component: InView,
  argTypes: {
    onInView: { action: 'onInView' },
  },
} as ComponentMeta<typeof InView>;

const Template: ComponentStory<typeof InView> = (args) => <InView {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: null,
  ...Default.args,
};
