import { Dispatch } from 'react';

import { useAuthActions } from './auth.actions';

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
  exp: number;
}

export interface Session {
  user: User;
  timestamp: Timestamp;
}

export interface AuthState {
  user: User | null;
  timestamp: Timestamp | null;
}

export enum AuthActionTypes {
  SetSession = 'SET_SESSION',
}

export type AuthPayloads = {
  [AuthActionTypes.SetSession]: Session | null;
};

export type AuthActions = Action<AuthPayloads>;

export type AuthReducer = Reducer<AuthState, AuthPayloads>;

export type AuthDispatch = Dispatch<AuthActions>;

export interface AuthContext {
  authState: AuthState;
  authActions: ReturnType<typeof useAuthActions>;
}
