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

import { Values } from './company-edit-location.types';
import { INITIAL_VALUES } from './company-edit-location.constants';
import styles from './company-edit-location.module.scss';

export const CompanyEditLocation: VFC = () => {
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
      address: company?.address,
    });
  }, [reset, company]);

  const onSubmit: SubmitHandler<Values> = ({ address }) => {
    const companyId = company?._id;

    if (!companyId) return;

    updateCompany({ id: companyId, form: { address } });
  };

  return (
    <div className={styles.content}>
      <InfoBlock
        title={t('account:companies.location.title')}
        icon={IconName.Info}
        columns={1}
      >
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset} disabled={isLoading}>
            <TextInput
              {...register('address')}
              label={t('account:companies.location.form.address.label')}
              error={errors.address?.message}
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
