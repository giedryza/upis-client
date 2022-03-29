export enum Role {
  User = 'user',
  Manager = 'manager',
  Admin = 'admin',
}

export interface User {
  id: string;
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
