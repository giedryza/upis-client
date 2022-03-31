import { endpoints } from 'config/endpoints';
import { Http } from 'tools/services/http/http';
import { ApiResponse } from 'tools/services/http/http.types';
import { getJsonBody } from 'tools/services/http/http.utils';
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
    new Http<ApiResponse<Session>>(endpoints.users.signup, {
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
    new Http(endpoints.users.updatePassword, {
      body: getJsonBody({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    }).patch(),
};
