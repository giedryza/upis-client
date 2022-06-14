import { useEffect, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, TextInput } from 'ui';
import { routes } from 'config/routes';
import { InfoBlock } from 'components/account/atoms';
import { useUpdateCompany, useActiveCompany } from 'domain/companies';

import { Values } from './company-edit-about.types';
import { INITIAL_VALUES } from './company-edit-about.constants';
import styles from './company-edit-about.module.scss';

export const CompanyEditAbout: VFC = () => {
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
      name: company?.name,
      description: company?.description,
    });
  }, [reset, company]);

  const onSubmit: SubmitHandler<Values> = ({ name, description }) => {
    const companyId = company?._id;

    if (!companyId) return;

    updateCompany(
      { id: companyId, form: { name, description } },
      {
        onSuccess: () => {
          push(
            routes.account.companies.one.index.replace(
              ':id',
              company?._id ?? ''
            )
          );
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
