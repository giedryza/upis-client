import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, SelectInput, TextInput } from 'ui';
import { routes } from 'config';
import { InfoBlock } from 'components/account/atoms';
import { useAddSocialLink, SocialType } from 'domain/social-links';
import { generateUrl, getRouteParam } from 'tools/common';

import { Values } from './provider-edit-social-links-add.types';
import { INITIAL_VALUES } from './provider-edit-social-links-add.constants';
import styles from './provider-edit-social-links-add.module.scss';

export const ProviderEditSocialLinksAdd: FC = () => {
  const { t } = useTranslation();
  const { push, query } = useRouter();

  const providerId = getRouteParam(query.id);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { mutate: addSocialLink, isLoading } = useAddSocialLink();

  const onSubmit: SubmitHandler<Values> = ({ type, url }) => {
    if (!providerId) return;

    addSocialLink(
      { hostId: providerId, form: { type, url } },
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
      title={t('account:providers.socialLinks.title')}
      icon="network"
      columns={1}
    >
      <Container align="left" size="sm">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset} disabled={isLoading}>
            <SelectInput
              {...register('type', {
                required: {
                  value: true,
                  message: t(
                    'account:providers.socialLinks.form.type.error.empty'
                  ),
                },
              })}
              label={t('account:providers.socialLinks.form.type.label')}
              error={errors.type?.message}
              options={Object.values(SocialType).map((type) => ({
                label: t(`socials:${type}`),
                value: type,
              }))}
            />

            <TextInput
              {...register('url', {
                required: {
                  value: true,
                  message: t(
                    'account:providers.socialLinks.form.url.error.empty'
                  ),
                },
              })}
              label={t('account:providers.socialLinks.form.url.label')}
              placeholder="https://upis.lt"
              error={errors.url?.message}
            />
          </fieldset>

          <div className={styles.actions}>
            <Button
              as="link"
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              href={generateUrl(routes.account.providers.one.index, {
                id: providerId,
              })}
            />

            <Button
              as="button"
              label={t('common:actions.add')}
              variant="tertiary"
              size="sm"
              type="submit"
              disabled={!isDirty || isLoading}
            />
          </div>
        </form>
      </Container>
    </InfoBlock>
  );
};
