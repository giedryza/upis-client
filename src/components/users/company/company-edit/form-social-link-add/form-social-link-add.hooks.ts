import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { UseFormBase, ValidationRules } from 'types/common/forms';
import { FormSocialLinkValues } from 'components/users/company/company-edit/form-social-link/form-social-link.types';

export const useFormSocialLinkAdd: UseFormBase<FormSocialLinkValues> = (
  onSubmit,
  values
) => {
  const { t } = useTranslation();

  const { register, reset, handleSubmit, formState } =
    useForm<FormSocialLinkValues>({
      defaultValues: values,
    });

  const { isSubmitting, isValidating, isSubmitted, isValid, errors } =
    formState;

  const validation: ValidationRules<FormSocialLinkValues> = {
    url: {
      required: {
        value: true,
        message: t('users:company.form.socialLinks.url.errors.empty'),
      },
    },
  };

  const errorMessages = {
    url: isSubmitted ? errors.url?.message : '',
  };

  const refs = {
    type: register('type', { ...validation.type }),
    url: register('url', { ...validation.url }),
  };

  useEffect(() => {
    reset({
      type: values.type,
      url: values.url,
    });
  }, [reset, values]);

  return {
    handleSubmit: handleSubmit(onSubmit),
    refs,
    errorMessages,
    isDisabled: isSubmitting || isValidating || (isSubmitted && !isValid),
  };
};
