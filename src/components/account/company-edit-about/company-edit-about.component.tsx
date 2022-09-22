import { useEffect, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  Button,
  CheckboxGroupInput,
  Container,
  MultiAutocompleteInput,
  TextInput,
} from 'ui';
import { routes } from 'config/routes';
import { InfoBlock } from 'components/account/atoms';
import {
  useUpdateCompany,
  useActiveCompany,
  boats as supportedBoats,
} from 'domain/companies';
import { languages as supportedLanguages } from 'types/common';

import { Values } from './company-edit-about.types';
import { INITIAL_VALUES } from './company-edit-about.constants';
import styles from './company-edit-about.module.scss';

export const CompanyEditAbout: VFC = () => {
  const { t, lang } = useTranslation();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { data: company } = useActiveCompany();
  const { mutate: updateCompany, isLoading } = useUpdateCompany();

  useEffect(() => {
    reset({
      name: company?.name,
      description: company?.description,
      languages: company?.languages,
      boats: company?.boats,
    });
  }, [reset, company]);

  const onSubmit: SubmitHandler<Values> = ({
    name,
    description,
    languages,
    boats,
  }) => {
    const companyId = company?._id;

    if (!companyId) return;

    updateCompany(
      { id: companyId, form: { name, description, languages, boats } },
      {
        onSuccess: () => {
          push(routes.account.companies.one.index.replace(':id', companyId));
        },
      }
    );
  };

  return (
    <InfoBlock
      title={t('account:companies.about.title')}
      icon="info"
      columns={1}
    >
      <Container align="left" size="sm">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset} disabled={isLoading}>
            <TextInput
              {...register('name', {
                required: {
                  value: true,
                  message: t('account:companies.about.form.name.error.empty'),
                },
              })}
              label={t('account:companies.about.form.name.label')}
              error={errors.name?.message}
            />

            <TextInput
              {...register('description')}
              label={t('account:companies.about.form.description.label')}
              type="textarea"
              rows={8}
              error={errors.description?.message}
            />

            <Controller
              control={control}
              name="languages"
              render={({ field: { name, onChange, value, ref } }) => (
                <MultiAutocompleteInput
                  name={name}
                  label={t('account:companies.about.form.languages.label')}
                  placeholder={t(
                    'account:companies.about.form.languages.placeholder'
                  )}
                  items={
                    supportedLanguages.map((language) => ({
                      label: new Intl.DisplayNames([lang], {
                        type: 'language',
                      }).of(language) as string,
                      value: language,
                    })) ?? []
                  }
                  value={value}
                  onChange={onChange}
                  error={errors.languages?.message}
                  ref={ref}
                />
              )}
            />

            <Controller
              control={control}
              name="boats"
              render={({ field: { onChange, value, ref } }) => (
                <CheckboxGroupInput
                  label={t('account:companies.about.form.boats.label')}
                  items={
                    supportedBoats.map((boat) => ({
                      label: t(`common:boats.${boat}`),
                      value: boat,
                    })) ?? []
                  }
                  value={value}
                  onChange={onChange}
                  error={errors.boats?.message}
                  ref={ref}
                />
              )}
            />
          </fieldset>

          <div className={styles.actions}>
            <Button
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              url={routes.account.companies.one.index.replace(
                ':id',
                company?._id ?? ''
              )}
            />

            <Button
              label={t('common:actions.save')}
              variant="tertiary"
              size="sm"
              attributes={{
                type: 'submit',
                disabled: !isDirty || isLoading,
              }}
            />
          </div>
        </form>
      </Container>
    </InfoBlock>
  );
};
