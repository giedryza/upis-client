import { Values } from './profile-edit-security.types';

export const INITIAL_VALUES: Values = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_MAX_LENGTH = 50;
