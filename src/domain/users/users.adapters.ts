import { endpoints } from 'config/endpoints';
import { Http } from 'tools/libs/http/http.lib';
import { getJsonBody } from 'tools/libs/http/http.utils';

export const adapters = {
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
