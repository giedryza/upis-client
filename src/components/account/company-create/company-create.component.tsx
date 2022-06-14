import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { routes } from 'config/routes';
import { Button, Container, TextInput } from 'ui';
import { InfoBlock } from 'components/account/atoms';
import { useCreateCompany } from 'domain/companies';

import { Values } from './company-create.types';
import { INITIAL_VALUES } from './company-create.constants';
import styles from './company-create.module.scss';

export const CompanyCreate: VFC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { mutate: createCompany, isLoading } = useCreateCompany();

  const onSubmit: SubmitHandler<Values> = ({
    name,
    email,
    phone,
    description,
  }) => {
    createCompany(
      { form: { name, email, phone, description } },
      {
        onSuccess: () => {
          push(routes.account.companies.index);
        },
      }
    );
  };

  return (
    <InfoBlock
      title={t('account:companies.title', { count: 1 })}
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
                  message: t('account:companies.about.form.name.error.empty'),
                },
              })}
              label={t('account:companies.about.form.name.label')}
              error={errors.name?.message}
            />

            <TextInput
              {...register('email', {
                required: {
                  value: true,
                  message: t(
                    'account:companies.contacts.form.email.error.empty'
                  ),
                },
              })}
              label={t('account:companies.contacts.form.email.label')}
              placeholder="jonas@doe.com"
              type="email"
              error={errors.email?.message}
            />

            <TextInput
              {...register('phone', {
                required: {
                  value: true,
                  message: t(
                    'account:companies.contacts.form.phone.error.empty'
                  ),
                },
              })}
              label={t('account:companies.contacts.form.phone.label')}
              placeholder="+37065555555"
              type="phone"
              error={errors.phone?.message}
            />

            <TextInput
              {...register('description')}
              label={t('account:companies.about.form.description.label')}
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
              url={routes.account.companies.index}
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
