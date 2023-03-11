import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, TextInput } from 'ui';
import { routes } from 'config';
import { generateUrl } from 'tools/services';
import { InfoBlock } from 'components/account/atoms';
import { useActiveProvider, useUpdateProvider } from 'domain/providers';

import { Values } from './provider-edit-contacts.types';
import { INITIAL_VALUES } from './provider-edit-contacts.constants';
import styles from './provider-edit-contacts.module.scss';

export const ProviderEditContacts: FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const { data: provider } = useActiveProvider();
  const { mutate: updateProvider, isLoading } = useUpdateProvider();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
    values: provider
      ? {
          email: provider.email,
          phone: provider.phone,
          website: provider.website,
        }
      : undefined,
  });

  const onSubmit: SubmitHandler<Values> = ({ email, phone, website }) => {
    const providerId = provider?._id;

    if (!providerId) return;

    updateProvider(
      { id: providerId, form: { email, phone, website } },
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
      title={t('account:providers.contacts.title')}
      icon="contacts"
      columns={1}
    >
      <Container align="left" size="sm">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset} disabled={isLoading}>
            <TextInput
              {...register('email', {
                required: {
                  value: true,
                  message: t(
                    'account:providers.contacts.form.email.error.empty'
                  ),
                },
              })}
              label={t('account:providers.contacts.form.email.label')}
              placeholder="jonas@doe.com"
              type="email"
              error={errors.email?.message}
            />

            <TextInput
              {...register('phone', {
                required: {
                  value: true,
                  message: t(
                    'account:providers.contacts.form.phone.error.empty'
                  ),
                },
              })}
              label={t('account:providers.contacts.form.phone.label')}
              type="phone"
              error={errors.phone?.message}
            />

            <TextInput
              {...register('website')}
              label={t('account:providers.contacts.form.website.label')}
              placeholder="https://upis.lt"
              error={errors.website?.message}
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
