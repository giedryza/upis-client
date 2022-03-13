import { useEffect, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, IconName, TextInput } from 'ui';
import { routes } from 'config/routes';
import { getRouteParam } from 'tools/common/getRouteParam';
import { InfoBlock } from 'components/account/atoms';
import { useUpdateCompany } from 'domain/companies/companies.mutations';
import { useActiveCompany } from 'domain/companies/companies.queries';

import { Values } from './company-edit-contacts.types';
import { INITIAL_VALUES } from './company-edit-contacts.constants';
import styles from './company-edit-contacts.module.scss';

export const CompanyEditContacts: VFC = () => {
  const { t } = useTranslation();
  const { query, push } = useRouter();

  const slug = getRouteParam(query.slug);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { data: company } = useActiveCompany();
  const { mutate: updateCompany, isLoading } = useUpdateCompany({
    onSuccess: () => {
      push(routes.account.companies.one.index.replace(':slug', slug));
    },
  });

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

    updateCompany({ id: companyId, form: { email, phone, website } });
  };

  return (
    <div className={styles.content}>
      <InfoBlock
        title={t('account:companies.contacts.title')}
        icon={IconName.Phone}
        columns={1}
      >
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
              placeholder="https://tinklapis.lt"
              type="url"
              error={errors.website?.message}
            />
          </fieldset>

          <div className={styles.actions}>
            <Button
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              url={routes.account.companies.one.index.replace(':slug', slug)}
            />

            <Button
              label={t('common:actions.save')}
              variant="primary"
              size="sm"
              attributes={{
                type: 'submit',
                disabled: !isDirty || isLoading,
              }}
            />
          </div>
        </form>
      </InfoBlock>
    </div>
  );
};
