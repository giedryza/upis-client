import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { routes } from 'config';
import { generateUrl } from 'tools/common';
import { Button, Container, SelectInput, TextInput } from 'ui';
import { InfoBlock } from 'components/account/atoms';
import { useCreateTour } from 'domain/tours';
import { useMyProviders } from 'domain/providers';

import { Values } from './tour-create.types';
import { INITIAL_VALUES } from './tour-create.constants';
import styles from './tour-create.module.scss';

export const TourCreate: FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { data: providers } = useMyProviders({ select: ['_id', 'name'] });
  const { mutate: createTour, isLoading } = useCreateTour();

  const onSubmit: SubmitHandler<Values> = ({ name, provider }) => {
    createTour(
      { form: { name, provider } },
      {
        onSuccess: ({ data }) => {
          push(generateUrl(routes.account.tours.one.index, { id: data._id }));
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
              {...register('provider', {
                required: {
                  value: true,
                  message: t('account:tours.about.form.provider.error.empty'),
                },
              })}
              options={
                providers?.items.map((provider) => ({
                  label: provider.name,
                  value: provider._id,
                })) ?? []
              }
              label={t('account:tours.about.form.provider.label')}
              placeholder={t('account:tours.about.form.provider.placeholder')}
              error={errors.provider?.message}
            />
          </fieldset>

          <div className={styles.actions}>
            <Button
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              url={generateUrl(routes.account.tours.index)}
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
