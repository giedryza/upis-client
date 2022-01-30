import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { UseFormBase, ValidationRules } from 'types/common/forms';
import { selectMyCompany } from 'domain/companies/companies.selectors';
import { FORM_DESCRIPTION_INITIAL_VALUES } from 'components/users/company/company-edit/form-description/form-description.constants';
import { FormDescriptionValues } from 'components/users/company/company-edit/form-description/form-description.types';

export const useFormDescription: UseFormBase<FormDescriptionValues> = (
  onSubmit,
  values
) => {
  const { register, reset, handleSubmit, formState } =
    useForm<FormDescriptionValues>({
      defaultValues: values,
    });

  const { isSubmitting, isValidating, isSubmitted, isValid, errors } =
    formState;

  const validation: ValidationRules<FormDescriptionValues> = {
    description: {},
  };

  const errorMessages = {
    description: isSubmitted ? errors.description?.message : '',
  };

  const refs = {
    description: register('description', { ...validation.description }),
  };

  useEffect(() => {
    reset({
      description: values.description,
    });
  }, [reset, values]);

  return {
    handleSubmit: handleSubmit(onSubmit),
    refs,
    errorMessages,
    isDisabled: isSubmitting || isValidating || (isSubmitted && !isValid),
  };
};

export const useValues = (): FormDescriptionValues => {
  const myCompany = useSelector(selectMyCompany);

  const values = useMemo(
    (): FormDescriptionValues =>
      myCompany
        ? {
            description: myCompany.description,
          }
        : FORM_DESCRIPTION_INITIAL_VALUES,
    [myCompany]
  );

  return values;
};
