import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Icon, IconName } from '.';

export default {
  title: 'UI/Icon',
  component: Icon,
  args: {},
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 50 }}>
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      {Object.values(IconName)
        .filter(
          (name) =>
            !name.startsWith('logo-') &&
            !name.startsWith('flag-') &&
            !name.startsWith('util-')
        )
        .map((name) => (
          <div key={name}>
            <div
              style={{
                backgroundColor: '#f1f2f4',
                padding: 15,
                width: 60,
                height: 60,
                margin: 'auto',
              }}
            >
              <Icon {...args} name={name} />
            </div>
            <span
              style={{
                display: 'inline-block',
                width: 100,
                textAlign: 'center',
                padding: 5,
              }}
            >
              {name}
            </span>
          </div>
        ))}
    </div>
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      {Object.values(IconName)
        .filter((name) => name.startsWith('logo-'))
        .map((name) => (
          <div key={name}>
            <div
              style={{
                backgroundColor: '#f1f2f4',
                padding: 15,
                width: 60,
                height: 60,
                margin: 'auto',
              }}
            >
              <Icon {...args} name={name} />
            </div>
            <span
              style={{
                display: 'inline-block',
                width: 100,
                textAlign: 'center',
                padding: 5,
              }}
            >
              {name}
            </span>
          </div>
        ))}
    </div>
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      {Object.values(IconName)
        .filter((name) => name.startsWith('flag-'))
        .map((name) => (
          <div key={name}>
            <div
              style={{
                backgroundColor: '#f1f2f4',
                padding: 15,
                width: 60,
                height: 60,
                margin: 'auto',
              }}
            >
              <Icon {...args} name={name} />
            </div>
            <span
              style={{
                display: 'inline-block',
                width: 100,
                textAlign: 'center',
                padding: 5,
              }}
            >
              {name}
            </span>
          </div>
        ))}
    </div>
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      {Object.values(IconName)
        .filter((name) => name.startsWith('util-'))
        .map((name) => (
          <div key={name}>
            <div
              style={{
                backgroundColor: '#f1f2f4',
                padding: 15,
                width: 60,
                height: 60,
                margin: 'auto',
              }}
            >
              <Icon {...args} name={name} />
            </div>
            <span
              style={{
                display: 'inline-block',
                width: 100,
                textAlign: 'center',
                padding: 5,
              }}
            >
              {name}
            </span>
          </div>
        ))}
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
