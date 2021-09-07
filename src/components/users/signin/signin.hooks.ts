import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { UseFormBase, ValidationRules } from 'types/common/forms';
import { SigninFormValues } from 'components/users/signin/signin.types';

export const useSigninForm: UseFormBase<SigninFormValues> = (
  onSubmit,
  values
) => {
  const { t } = useTranslation();

  const {
    register,
    reset,
    handleSubmit,
    formState,
  } = useForm<SigninFormValues>({
    defaultValues: values,
  });

  const {
    isSubmitting,
    isValidating,
    isSubmitted,
    isValid,
    errors,
  } = formState;

  const validation: ValidationRules<SigninFormValues> = {
    email: {
      required: {
        value: true,
        message: t('users:errors.email.empty'),
      },
    },
    password: {
      required: {
        value: true,
        message: t('users:errors.password.empty'),
      },
      minLength: {
        value: 8,
        message: t('users:errors.password.length'),
      },
      maxLength: {
        value: 50,
        message: t('users:errors.password.length'),
      },
    },
  };

  const errorMessages = {
    email: isSubmitted ? errors.email?.message : '',
    password: isSubmitted ? errors.password?.message : '',
  };

  const refs = {
    email: register('email', { ...validation.email }),
    password: register('password', { ...validation.password }),
  };

  useEffect(() => {
    reset({
      email: values.email,
      password: values.password,
    });
  }, [reset, values]);

  return {
    handleSubmit: handleSubmit(onSubmit),
    refs,
    errorMessages,
    isDisabled: isSubmitting || isValidating || (isSubmitted && !isValid),
  };
};
