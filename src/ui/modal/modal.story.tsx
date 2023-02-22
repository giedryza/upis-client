import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Modal } from '.';

export default {
  title: 'UI/Modal',
  component: Modal,
  args: {
    id: 'LOREM_IPSUM',
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal.OverlayProvider>
    <Modal {...args}>
      <Modal.Content
        title="Lorem ipsum"
        actions={[
          { as: 'button', label: 'Close', variant: 'ghost' },
          { as: 'button', label: 'OK', variant: 'primary' },
        ]}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
          voluptatem dolor perferendis harum adipisci quis sequi sint quo.
        </p>
      </Modal.Content>
    </Modal>
  </Modal.OverlayProvider>
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  isOpen: true,
};
