import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import { useSelector } from 'react-redux';

import { UseFormBase, ValidationRules } from 'types/common/forms';
import { selectMyCompanySocialLinks } from 'domain/companies/companies.selectors';
import { FORM_SOCIAL_LINK_INITIAL_VALUES } from 'components/users/company/company-edit/form-social-link/form-social-link.constants';
import { FormSocialLinkValues } from 'components/users/company/company-edit/form-social-link/form-social-link.types';

export const useFormSocialLink: UseFormBase<FormSocialLinkValues> = (
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

export const useValues = (socialLinkId: string): FormSocialLinkValues => {
  const myCompanySocialLinks = useSelector(selectMyCompanySocialLinks);

  const socialLink = myCompanySocialLinks.find(
    (link) => link._id === socialLinkId
  );

  const values = useMemo(
    (): FormSocialLinkValues =>
      socialLink
        ? {
            type: socialLink.type,
            url: socialLink.url,
          }
        : FORM_SOCIAL_LINK_INITIAL_VALUES,
    [socialLink]
  );

  return values;
};
