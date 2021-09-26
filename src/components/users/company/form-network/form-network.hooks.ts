import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';

import { UseFormBase, ValidationRules } from 'types/common/forms';
import { isUrl } from 'utils/constants/regex';
import { selectMyCompany } from 'domain/companies/companies.selectors';
import { CompanyFormNetworkValues } from 'components/users/company/form-network/form-network.types';
import { INITIAL_VALUES } from 'components/users/company/form-network/form-network.constants';

export const useCompanyFormNetwork: UseFormBase<CompanyFormNetworkValues> = (
  onSubmit,
  values
) => {
  const { t } = useTranslation();

  const {
    register,
    reset,
    handleSubmit,
    formState,
  } = useForm<CompanyFormNetworkValues>({
    defaultValues: values,
  });

  const {
    isSubmitting,
    isValidating,
    isSubmitted,
    isValid,
    errors,
  } = formState;

  const validation: ValidationRules<CompanyFormNetworkValues> = {
    website: {
      pattern: {
        value: isUrl,
        message: t('users:errors.company.website.invalid'),
      },
    },
  };

  const errorMessages = {
    website: isSubmitted ? errors.website?.message : '',
  };

  const refs = {
    website: register('website', { ...validation.website }),
  };

  useEffect(() => {
    reset({
      website: values.website,
    });
  }, [reset, values]);

  return {
    handleSubmit: handleSubmit(onSubmit),
    refs,
    errorMessages,
    isDisabled: isSubmitting || isValidating || (isSubmitted && !isValid),
  };
};

export const useValues = (): CompanyFormNetworkValues => {
  const myCompany = useSelector(selectMyCompany);

  const values = useMemo(
    (): CompanyFormNetworkValues =>
      myCompany
        ? {
            website: myCompany.website,
          }
        : INITIAL_VALUES,
    [myCompany]
  );

  return values;
};
