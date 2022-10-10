import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from 'ui';

import { ImageBox } from '.';

export default {
  title: 'UI/ImageBox',
  component: ImageBox,
  args: {
    image:
      'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
    alt: 'Mount Fuji',
    actions: [
      {
        icon: 'price',
      },
      {
        icon: 'camera',
      },
      {
        icon: 'trash',
      },
    ],
    label: 'Primary',
  },
} as ComponentMeta<typeof ImageBox>;

const Template: ComponentStory<typeof ImageBox> = (args) => (
  <Container size="xs">
    <ImageBox {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
