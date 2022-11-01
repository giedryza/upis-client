import { ComponentStory, ComponentMeta } from '@storybook/react';

import { baseIcons, utilIcons, flagIcons, logoIcons } from './icon.types';

import { Icon } from '.';

export default {
  title: 'UI/Icon',
  component: Icon,
  args: {},
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 50 }}>
    <ul style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      {baseIcons.map((name) => (
        <li key={name}>
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
        </li>
      ))}
    </ul>
    <ul style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      {logoIcons.map((name) => (
        <li key={name}>
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
        </li>
      ))}
    </ul>
    <ul style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      {flagIcons.map((name) => (
        <li key={name}>
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
        </li>
      ))}
    </ul>
    <ul style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      {utilIcons.map((name) => (
        <li key={name}>
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
        </li>
      ))}
    </ul>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
