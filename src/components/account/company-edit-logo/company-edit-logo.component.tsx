import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, FileInput } from 'ui';
import { routes } from 'config/routes';
import { InfoBlock } from 'components/account/atoms';
import { useActiveCompany, useUploadLogo } from 'domain/companies';

import { Values } from './company-edit-logo.types';
import styles from './company-edit-logo.module.scss';

export const CompanyEditLogo: VFC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<Values>();

  const { data: company } = useActiveCompany();
  const { mutate: uploadLogo, isLoading } = useUploadLogo();

  const onSubmit: SubmitHandler<Values> = ({ logo }) => {
    const companyId = company?._id;

    if (!companyId) return;

    uploadLogo(
      { id: companyId, logo },
      {
        onSuccess: () => {
          push(routes.account.companies.one.index.replace(':id', companyId));
        },
      }
    );
  };

  return (
    <InfoBlock
      title={t('account:companies.logo.title')}
      icon="picture"
      columns={1}
    >
      <Container align="left" size="sm">
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
