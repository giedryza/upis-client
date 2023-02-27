import { ComponentStory, ComponentMeta } from '@storybook/react';

import { variants } from './button.types';

import { Button } from '.';

export default {
  title: 'UI/Button',
  component: Button,
  args: {
    as: 'button',
  },
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
      {variants.map((variant) => (
        <Button {...args} label={variant} variant={variant} key={variant} />
      ))}
    </div>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 15,
        flexWrap: 'wrap',
      }}
    >
      {variants.map((variant) => (
        <Button
          {...args}
          label={variant}
          variant={variant}
          icon="pencil"
          key={variant}
        />
      ))}
    </div>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 15,
        flexWrap: 'wrap',
      }}
    >
      {variants.map((variant) => (
        <Button {...args} variant={variant} icon="pencil" key={variant} />
      ))}
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
