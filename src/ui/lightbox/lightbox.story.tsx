import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Lightbox } from '.';

export default {
  title: 'UI/Lightbox',
  component: Lightbox,
  args: {
    id: 'LOREM_IMAGE',
    images: [
      {
        id: '1',
        url: 'https://upis.s3.eu-central-1.amazonaws.com/development/b46f1388-0e93-42cf-bdbe-c36fa5ccae53.avif',
        alt: 'Upėje su baidarėmis plaukiantys trys žmonės',
      },
      {
        id: '2',
        url: 'https://upis.s3.eu-central-1.amazonaws.com/development/61a901c7-a720-4451-b09f-1f7457cd921f.avif',
        alt: 'Saulėlydžio metu irkluojantis vyras',
      },
      {
        id: '3',
        url: 'https://upis.s3.eu-central-1.amazonaws.com/development/e86af207-d793-4e28-be7a-a70853741b51.avif',
        alt: 'Dvi tuščios baidarės smėlėtame krante',
      },
    ],
  },
  argTypes: {
    onClose: { action: 'onClose' },
  },
} as ComponentMeta<typeof Lightbox>;

const Template: ComponentStory<typeof Lightbox> = (args) => (
  <Lightbox.Provider>
    <Lightbox {...args} />
  </Lightbox.Provider>
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  isOpen: true,
};
