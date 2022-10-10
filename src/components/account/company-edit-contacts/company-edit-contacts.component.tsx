import { useEffect, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, TextInput } from 'ui';
import { routes } from 'config/routes';
import { InfoBlock } from 'components/account/atoms';
import { useActiveCompany, useUpdateCompany } from 'domain/companies';

import { Values } from './company-edit-contacts.types';
import { INITIAL_VALUES } from './company-edit-contacts.constants';
import styles from './company-edit-contacts.module.scss';

export const CompanyEditContacts: VFC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { data: company } = useActiveCompany();
  const { mutate: updateCompany, isLoading } = useUpdateCompany();

  useEffect(() => {
    reset({
      email: company?.email,
      phone: company?.phone,
      website: company?.website,
    });
  }, [reset, company]);

  const onSubmit: SubmitHandler<Values> = ({ email, phone, website }) => {
    const companyId = company?._id;

    if (!companyId) return;

    updateCompany(
      { id: companyId, form: { email, phone, website } },
      {
        onSuccess: () => {
          push(routes.account.companies.one.index.replace(':id', companyId));
        },
      }
    );
  };

  return (
    <InfoBlock
      title={t('account:companies.contacts.title')}
      icon="phone"
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
              type="phone"
              error={errors.phone?.message}
            />

            <TextInput
              {...register('website')}
              label={t('account:companies.contacts.form.website.label')}
              placeholder="https://upis.lt"
              type="url"
              error={errors.website?.message}
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
