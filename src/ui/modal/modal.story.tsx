import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Modal } from '.';

export default {
  title: 'UI/Modal',
  component: Modal,
  args: {
    id: 'LOREM_IPSUM',
  },
  argTypes: {
    onClose: { action: 'onClose' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal.Provider>
    <Modal {...args}>
      <Modal.Content
        title="Lorem ipsum"
        actions={[
          { label: 'Close', variant: 'ghost' },
          { label: 'OK', variant: 'primary' },
        ]}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
          voluptatem dolor perferendis harum adipisci quis sequi sint quo.
        </p>
      </Modal.Content>
    </Modal>
  </Modal.Provider>
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  isOpen: true,
};
