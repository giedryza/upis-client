import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from 'ui';

import { ImagePlaceholder } from '.';

export default {
  title: 'UI/ImagePlaceholder',
  component: ImagePlaceholder,
  args: {},
} as ComponentMeta<typeof ImagePlaceholder>;

const Template: ComponentStory<typeof ImagePlaceholder> = (args) => (
  <Container size="xs">
    <ImagePlaceholder {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
