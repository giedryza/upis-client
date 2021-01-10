import { Reducer } from 'redux';

import { Actions } from 'utils/libs/store/store.types';

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
  SetUser = 'auth/SET_USER',
  SetSession = 'auth/SET_SESSION',
  ClearSession = 'auth/CLEAR_SESSION',
}

export type AuthPayloads = {
  [AuthActionTypes.SetUser]: User | null;
  [AuthActionTypes.SetSession]: Session;
  [AuthActionTypes.ClearSession]: undefined;
};

export type AuthActions = Actions<AuthPayloads>;

export type AuthReducer = Reducer<AuthState, AuthActions>;
