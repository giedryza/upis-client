import { Dispatch } from 'react';

import { Action, Reducer } from 'utils/context/types';

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

export interface Timestamp {
  iat: number;
  exp: number | null;
}

export interface Session {
  user: User | null;
  timestamp: Timestamp;
}

export interface AuthState {
  user: User | null;
  timestamp: Timestamp | null;
}

export enum AuthActionTypes {
  SetUser,
  SetSession,
  ClearSession,
}

export type AuthPayloads = {
  [AuthActionTypes.SetUser]: User | null;
  [AuthActionTypes.SetSession]: Session;
  [AuthActionTypes.ClearSession]: undefined;
};

export type AuthActions = Action<AuthPayloads>;

export type AuthReducer = Reducer<AuthState, AuthPayloads>;

export type AuthDispatch = Dispatch<AuthActions>;
