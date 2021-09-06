import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { ErrorMessages, ValidationRules } from 'types/common/forms';
import { FormInfoValues } from 'components/users/company/form-info/form-info.types';

const INITIAL_VALUES: FormInfoValues = {
  name: '',
  phone: '',
  email: '',
};

export const useFormInfo = (
  onSubmit: SubmitHandler<FormInfoValues>,
  values: FormInfoValues | null
) => {
  const { t } = useTranslation();

  const {
    register,
    reset,
    handleSubmit,
    errors,
    formState,
  } = useForm<FormInfoValues>({
    defaultValues: INITIAL_VALUES,
    mode: 'onChange',
  });

  const { isSubmitting, isValidating, isSubmitted, isValid } = formState;

  const validation: ValidationRules<FormInfoValues> = {
    name: {
      required: {
        value: true,
        message: t('users:errors.company.name.empty'),
      },
    },
    email: {
      required: {
        value: true,
        message: t('users:errors.company.email.empty'),
      },
    },
    phone: {
      required: {
        value: true,
        message: t('users:errors.company.phone.empty'),
      },
    },
  };

  const errorMessages: ErrorMessages<FormInfoValues> = {
    name: isSubmitted ? errors.name?.message : '',
    phone: isSubmitted ? errors.phone?.message : '',
    email: isSubmitted ? errors.email?.message : '',
  };

  const isSubmitDisabled: boolean =
    isSubmitting || isValidating || (isSubmitted && !isValid);

  const refs = {
    name: register(validation.name),
    phone: register(validation.phone),
    email: register(validation.email),
  };

  useEffect(() => {
    if (!values) return;

    reset({
      name: values.name,
      phone: values.phone,
      email: values.email,
    });
  }, [reset, values]);

  return {
    handleSubmit: handleSubmit(onSubmit),
    refs,
    errorMessages,
    isSubmitDisabled,
  };
};
