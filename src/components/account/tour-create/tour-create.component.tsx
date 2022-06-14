import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { routes } from 'config/routes';
import { Button, Container, SelectInput, TextInput } from 'ui';
import { InfoBlock } from 'components/account/atoms';
import { useCreateTour } from 'domain/tours';
import { useMyCompanies } from 'domain/companies';

import { Values } from './tour-create.types';
import { INITIAL_VALUES } from './tour-create.constants';
import styles from './tour-create.module.scss';

export const TourCreate: VFC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { data: companies = [] } = useMyCompanies({ select: ['_id', 'name'] });

  const { mutate: createTour, isLoading } = useCreateTour();

  const onSubmit: SubmitHandler<Values> = ({ name, company }) => {
    createTour(
      { form: { name, company } },
      {
        onSuccess: () => {
          push(routes.account.tours.index);
        },
      }
    );
  };

  return (
    <InfoBlock
      title={t('account:tours.title', { count: 1 })}
      icon="path"
      columns={1}
    >
      <Container align="left" size="sm">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset} disabled={isLoading}>
            <TextInput
              {...register('name', {
                required: {
                  value: true,
                  message: t('account:tours.about.form.name.error.empty'),
                },
              })}
              label={t('account:tours.about.form.name.label')}
              placeholder={t('account:tours.about.form.name.placeholder')}
              error={errors.name?.message}
            />

            <SelectInput
              {...register('company', {
                required: {
                  value: true,
                  message: t('account:tours.about.form.company.error.empty'),
                },
              })}
              options={companies.map((company) => ({
                label: company.name,
                value: company._id,
              }))}
              label={t('account:tours.about.form.company.label')}
              placeholder={t('account:tours.about.form.company.placeholder')}
              error={errors.company?.message}
            />
          </fieldset>

          <div className={styles.actions}>
            <Button
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              url={routes.account.tours.index}
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
