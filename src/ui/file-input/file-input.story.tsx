import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FileInput } from './file-input.component';

export default {
  title: 'UI/FileInput',
  component: FileInput,
} as ComponentMeta<typeof FileInput>;

const Template: ComponentStory<typeof FileInput> = (args) => (
  <FileInput {...args} />
);

export const Default = Template.bind({});
Default.args = {};
