import { BaseEntity } from 'types/common';

const roles = ['user', 'manager', 'admin'] as const;

export type Role = (typeof roles)[number];

export interface User extends BaseEntity {
  email: string;
  role: Role;
}

export interface Session {
  user: {
    _id: string;
    email: string;
    role: Role;
  };
  token: string;
}
