import { endpoints } from 'config/endpoints';
import { Request, getJsonBody } from 'tools/services/request';

import { Session } from './users.types';

export const loaders = {
  signup: ({
    email,
    password,
    confirmPassword,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
  }) =>
    new Request<Session>(endpoints.users.signup, {
      body: getJsonBody({
        email,
        password,
        confirmPassword,
      }),
    }).post(),
  updatePassword: ({
    currentPassword,
    newPassword,
    confirmPassword,
  }: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) =>
    new Request(endpoints.users.password.update, {
      body: getJsonBody({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    }).patch(),
  forgotPassword: ({ email }: { email: string }) =>
    new Request(endpoints.users.password.forgot, {
      body: getJsonBody({
        email,
      }),
    }).post(),
};
