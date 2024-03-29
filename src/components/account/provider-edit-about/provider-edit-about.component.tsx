import { FC } from 'react';
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
import { PROVIDERS, routes } from 'config';
import { InfoBlock } from 'components/account/atoms';
import { useUpdateProvider, useActiveProvider } from 'domain/providers';
import { languages as supportedLanguages } from 'types/common';
import { generateUrl } from 'tools/services';
import { formatLanguage } from 'tools/format';

import { Values } from './provider-edit-about.types';
import { INITIAL_VALUES } from './provider-edit-about.constants';
import styles from './provider-edit-about.module.scss';

export const ProviderEditAbout: FC = () => {
  const { t, lang } = useTranslation();
  const { push } = useRouter();

  const { data: provider } = useActiveProvider();
  const { mutate: updateProvider, isLoading } = useUpdateProvider();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
    values: provider
      ? {
          name: provider.name,
          description: provider.description,
          languages: provider.languages,
          boats: provider.boats,
        }
      : undefined,
  });

  const onSubmit: SubmitHandler<Values> = ({
    name,
    description,
    languages,
    boats,
  }) => {
    const providerId = provider?._id;

    if (!providerId) return;

    updateProvider(
      { id: providerId, form: { name, description, languages, boats } },
      {
        onSuccess: () => {
          push(
            generateUrl(routes.account.providers.one.index, {
              id: providerId,
            })
          );
        },
      }
    );
  };

  return (
    <InfoBlock
      title={t('account:providers.about.title')}
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
                  message: t('account:providers.about.form.name.error.empty'),
                },
              })}
              label={t('account:providers.about.form.name.label')}
              error={errors.name?.message}
            />

            <TextInput
              {...register('description')}
              label={t('account:providers.about.form.description.label')}
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
                  label={t('account:providers.about.form.languages.label')}
                  placeholder={t(
                    'account:providers.about.form.languages.placeholder'
                  )}
                  items={
                    supportedLanguages.map((language) => ({
                      label: formatLanguage(lang, language),
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
                  label={t('account:providers.about.form.boats.label')}
                  items={
                    PROVIDERS.boats.map((boat) => ({
                      label: t(`boats:${boat}`),
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
              as="link"
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              href={generateUrl(routes.account.providers.one.index, {
                id: provider?._id ?? '',
              })}
            />

            <Button
              as="button"
              label={t('common:actions.save')}
              variant="tertiary"
              size="sm"
              type="submit"
              disabled={!isDirty || isLoading}
            />
          </div>
        </form>
      </Container>
    </InfoBlock>
  );
};
