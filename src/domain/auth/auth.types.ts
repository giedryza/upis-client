import { Reducer } from 'redux';

import { Actions } from 'types/common/redux';

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
  loading: boolean;
}

export enum AuthActionTypes {
  SetUser = 'auth/SET_USER',
  SetSession = 'auth/SET_SESSION',
  ClearSession = 'auth/CLEAR_SESSION',
  Signin = 'auth/SIGNIN',
  SetLoading = 'auth/SET_LOADING',
}

export type AuthPayloads = {
  [AuthActionTypes.SetUser]: User | null;
  [AuthActionTypes.SetSession]: Session;
  [AuthActionTypes.ClearSession]: undefined;
  [AuthActionTypes.Signin]: { email: string; password: string };
  [AuthActionTypes.SetLoading]: boolean;
};

export type AuthActions = Actions<AuthPayloads>;

export type AuthReducer = Reducer<AuthState, AuthActions>;
