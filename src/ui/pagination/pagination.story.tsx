import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Pagination } from '.';

export default {
  title: 'UI/Pagination',
  component: Pagination,
  args: {
    totalPages: 20,
    currentPage: 8,
    onLink: (page) => `?page=${page}`,
  },
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
