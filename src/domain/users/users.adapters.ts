import { endpoints } from 'config/endpoints';
import { Http } from 'tools/libs/http/http.lib';

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
      body: {
        currentPassword,
        newPassword,
        confirmPassword,
      },
    }).patch(),
};
