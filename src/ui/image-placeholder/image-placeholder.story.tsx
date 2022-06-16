import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ImagePlaceholder } from '.';

export default {
  title: 'UI/ImagePlaceholder',
  component: ImagePlaceholder,
  args: {
    width: 320,
  },
} as ComponentMeta<typeof ImagePlaceholder>;

const Template: ComponentStory<typeof ImagePlaceholder> = (args) => (
  <ImagePlaceholder {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
