import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, FileInput } from 'ui';
import { routes } from 'config';
import { InfoBlock } from 'components/account/atoms';
import { useActiveProvider, useUploadLogo } from 'domain/providers';
import { generateUrl } from 'tools/common';

import { Values } from './provider-edit-logo.types';
import styles from './provider-edit-logo.module.scss';

export const ProviderEditLogo: FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<Values>();

  const { data: provider } = useActiveProvider();
  const { mutate: uploadLogo, isLoading } = useUploadLogo();

  const onSubmit: SubmitHandler<Values> = ({ logo }) => {
    const providerId = provider?._id;

    if (!providerId) return;

    uploadLogo(
      { id: providerId, logo },
      {
        onSuccess: () => {
          push(
            generateUrl(routes.account.providers.one.index, {
              id: providerId,
            })
          );
        },
      }
    );
  };

  return (
    <InfoBlock
      title={t('account:providers.logo.title')}
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
                  accept={['jpeg', 'jpg', 'png', 'avif', 'svg', 'gif', 'bmp']}
                  previews
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
              url={generateUrl(routes.account.providers.one.index, {
                id: provider?._id ?? '',
              })}
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
