import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from 'ui';

import { ImageTile } from '.';

export default {
  title: 'UI/ImageTile',
  component: ImageTile,
  args: {
    image:
      'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
    alt: 'Mount Fuji',
    actions: [
      {
        as: 'button',
        icon: 'price',
      },
      {
        as: 'button',
        icon: 'camera',
      },
      {
        as: 'button',
        icon: 'trash',
      },
    ],
    tags: [
      {
        label: 'Primary',
        status: 'info',
      },
      {
        label: 'Alt',
        status: 'success',
      },
    ],
  },
} as ComponentMeta<typeof ImageTile>;

const Template: ComponentStory<typeof ImageTile> = (args) => (
  <Container size="xs">
    <ImageTile {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  sizes: { width: 800, height: 450 },
};
