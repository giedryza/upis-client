import { endpoints } from 'config/endpoints';
import { Request, getJsonBody, ApiResponse } from 'tools/services/request';
import { Session } from 'domain/users/users.types';

export const adapters = {
  signup: ({
    email,
    password,
    confirmPassword,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
  }) =>
    new Request<ApiResponse<Session>>(endpoints.users.signup, {
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
    new Request(endpoints.users.updatePassword, {
      body: getJsonBody({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    }).patch(),
};
