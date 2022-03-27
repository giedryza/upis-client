import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button, FileInput } from 'ui';
import { routes } from 'config/routes';
import { getRouteParam } from 'tools/common';
import { InfoBlock } from 'components/account/atoms';
import { useUploadLogo } from 'domain/companies/companies.mutations';
import { useActiveCompany } from 'domain/companies/companies.queries';

import { Values } from './company-edit-logo.types';
import styles from './company-edit-logo.module.scss';

export const CompanyEditLogo: VFC = () => {
  const { t } = useTranslation();
  const { query, push } = useRouter();

  const slug = getRouteParam(query.slug);

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<Values>();

  const { data: company } = useActiveCompany();
  const { mutate: uploadLogo, isLoading } = useUploadLogo({
    onSuccess: () => {
      push(routes.account.companies.one.index.replace(':slug', slug));
    },
  });

  const onSubmit: SubmitHandler<Values> = ({ logo }) => {
    const companyId = company?._id;

    if (!companyId) return;

    uploadLogo({ id: companyId, logo });
  };

  return (
    <div className={styles.content}>
      <InfoBlock
        title={t('account:companies.logo.title')}
        icon="picture"
        columns={1}
      >
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset} disabled={isLoading}>
            <Controller
              name="logo"
              control={control}
              render={({ field: { name, onChange, ref } }) => (
                <FileInput
                  name={name}
                  onChange={([file]) => {
                    onChange(file);
                  }}
                  accept={['jpeg', 'jpg', 'png', 'svg', 'gif', 'bmp']}
                  maxSize={1 * 1000 * 1000}
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
