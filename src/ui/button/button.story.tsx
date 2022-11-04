import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '.';

export default {
  title: 'UI/Button',
  component: Button,
  args: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 50,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 15,
        flexWrap: 'wrap',
      }}
    >
      <Button {...args} label="primary" variant="primary" />
      <Button {...args} label="secondary" variant="secondary" />
      <Button {...args} label="tertiary" variant="tertiary" />
      <Button {...args} label="ghost" variant="ghost" />
      <Button {...args} label="text" variant="text" />
      <Button {...args} label="link" variant="link" />
    </div>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 15,
        flexWrap: 'wrap',
      }}
    >
      <Button {...args} label="primary" variant="primary" icon="pencil" />
      <Button {...args} label="secondary" variant="secondary" icon="pencil" />
      <Button {...args} label="tertiary" variant="tertiary" icon="pencil" />
      <Button {...args} label="ghost" variant="ghost" icon="pencil" />
      <Button {...args} label="text" variant="text" icon="pencil" />
      <Button {...args} label="link" variant="link" icon="pencil" />
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  url: undefined,
  attributes: { disabled: true },
};
