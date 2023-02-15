import { ComponentStory, ComponentMeta } from '@storybook/react';

import { variants } from './logo.types';

import { Logo } from '.';

export default {
  title: 'UI/Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => (
  <ul style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
    {variants.map((variant) => (
      <li key={variant}>
        <div
          style={{
            backgroundColor: '#f1f2f4',
            padding: 25,
            width: 150,
            height: 150,
            margin: 'auto',
          }}
        >
          <Logo
            {...args}
            style={{ width: '100%', height: '100%' }}
            variant={variant}
          />
        </div>
        <span
          style={{
            display: 'inline-block',
            width: '100%',
            textAlign: 'center',
            padding: 5,
            fontSize: 14,
          }}
        >
          {variant}
        </span>
      </li>
    ))}
  </ul>
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
