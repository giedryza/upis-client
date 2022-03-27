import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from 'ui';

import { Table, TableProps } from '.';

type Columns = 'name' | 'age' | 'is_manager' | 'start_date' | 'actions';

export default {
  title: 'UI/Table',
  component: Table,
  args: {},
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

const MOCK_DATA = [
  {
    id: 1,
    name: 'Liz Lemon',
    age: 36,
    is_manager: true,
    start_date: '02-28-1999',
  },
  {
    id: 2,
    name: 'Jack Donaghy',
    age: 40,
    is_manager: true,
    start_date: '03-05-1997',
  },
  {
    id: 3,
    name: 'Tracy Morgan',
    age: 39,
    is_manager: false,
    start_date: '07-12-2002',
  },
  {
    id: 4,
    name: 'Jenna Maroney',
    age: 40,
    is_manager: false,
    start_date: '02-28-1999',
  },
  {
    id: 5,
    name: 'Kenneth Parcell',
    age: Infinity,
    is_manager: false,
    start_date: '01-01-1970',
  },
  {
    id: 6,
    name: 'Pete Hornberger',
    age: null,
    is_manager: true,
    start_date: '04-01-2000',
  },
  {
    id: 7,
    name: 'Frank Rossitano',
    age: 36,
    is_manager: false,
    start_date: null,
  },
];

const rows: TableProps<Columns>['rows'] = MOCK_DATA.map((item) => ({
  id: `${item.id}`,
  content: {
    name: item.name,
    age: item.age,
    is_manager: item.is_manager,
    start_date: item.start_date,
    actions: (
      <div style={{ display: 'inline-flex', gap: 10 }}>
        <Button
          icon="trash"
          size="xs"
          variant="secondary"
          attributes={{ 'aria-label': 'Delete' }}
        />
        <Button
          icon="pencil"
          size="xs"
          variant="secondary"
          attributes={{ 'aria-label': 'Edit' }}
        />
      </div>
    ),
  },
}));

const columns: TableProps<Columns>['columns'] = [
  { accessor: 'name', label: 'Name' },
  { accessor: 'age', label: 'Age', align: 'right' },
  {
    accessor: 'is_manager',
    label: 'Manager',
  },
  { accessor: 'start_date', label: 'Start Date' },
  { accessor: 'actions', label: '', align: 'right' },
];

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  columns,
  rows,
};

export const Empty = Template.bind({});
Empty.args = {
  ...Default.args,
  columns,
  rows: [],
};
