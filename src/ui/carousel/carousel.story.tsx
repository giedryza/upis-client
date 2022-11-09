import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Carousel } from '.';

export default {
  title: 'UI/Carousel',
  component: Carousel,
  args: {
    images: [
      {
        id: '1',
        url: 'https://upis.s3.eu-central-1.amazonaws.com/development/98e5f0fb-89b2-4de2-865a-b2712ade28b3.avif',
        alt: 'Upėje su baidarėmis plaukiantys trys žmonės',
      },
      {
        id: '2',
        url: 'https://upis.s3.eu-central-1.amazonaws.com/development/f8c289eb-803c-40a6-b984-ba9e5fffb96d.avif',
        alt: 'Saulėlydžio metu irkluojantis vyras',
      },
      {
        id: '3',
        url: 'https://upis.s3.eu-central-1.amazonaws.com/development/a124c53e-8c11-4faa-8aff-c07fcfde2799.avif',
        alt: 'Vertikali foto',
      },
    ],
    options: {
      fit: 'cover',
      behavior: 'smooth',
      size: 'sm',
      keyboard: false,
    },
    meta: false,
  },
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => (
  <div style={{ width: 400, height: 300 }}>
    <Carousel {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
