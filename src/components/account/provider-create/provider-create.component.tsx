import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { routes } from 'config/routes';
import { Button, Container, TextInput } from 'ui';
import { InfoBlock } from 'components/account/atoms';
import { useCreateProvider } from 'domain/providers';

import { Values } from './provider-create.types';
import { INITIAL_VALUES } from './provider-create.constants';
import styles from './provider-create.module.scss';

export const ProviderCreate: FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { mutate: createProvider, isLoading } = useCreateProvider();

  const onSubmit: SubmitHandler<Values> = ({
    name,
    email,
    phone,
    description,
  }) => {
    createProvider(
      { form: { name, email, phone, description } },
      {
        onSuccess: ({ data }) => {
          push(routes.account.providers.one.index.replace(':id', data._id));
        },
      }
    );
  };

  return (
    <InfoBlock
      title={t('account:providers.title', { count: 1 })}
      icon="kayak"
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
              placeholder="+37065555555"
              type="phone"
              error={errors.phone?.message}
            />

            <TextInput
              {...register('description')}
              label={t('account:providers.about.form.description.label')}
              type="textarea"
              rows={8}
              error={errors.description?.message}
            />
          </fieldset>

          <div className={styles.actions}>
            <Button
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              url={routes.account.providers.index}
            />

            <Button
              label={t('common:actions.submit')}
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
