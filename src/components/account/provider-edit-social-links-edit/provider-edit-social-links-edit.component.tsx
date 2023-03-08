import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, SelectInput, TextInput } from 'ui';
import { routes } from 'config';
import { getParameters } from 'schemas';
import { generateUrl } from 'tools/common';
import { InfoBlock } from 'components/account/atoms';
import {
  useActiveProvider,
  socials,
  useUpdateSocialLink,
} from 'domain/providers';

import { Values } from './provider-edit-social-links-edit.types';
import { INITIAL_VALUES } from './provider-edit-social-links-edit.constants';
import styles from './provider-edit-social-links-edit.module.scss';

export const ProviderEditSocialLinksEdit: FC = () => {
  const { t } = useTranslation();
  const { query, push } = useRouter();
  const { id, socialId } = getParameters(
    routes.account.providers.one.socials.one
  ).parse(query);

  const { data: provider } = useActiveProvider();
  const { mutate: updateSocialLink, isLoading } = useUpdateSocialLink();

  const social = provider?.socials.find(({ _id }) => _id === socialId);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
    values: social
      ? {
          type: social.type,
          url: social.url,
        }
      : undefined,
  });

  if (!provider || !social) return null;

  const onSubmit: SubmitHandler<Values> = ({ type, url }) => {
    updateSocialLink(
      { id: provider._id, form: { id: social._id, type, url } },
      {
        onSuccess: () => {
          push(generateUrl(routes.account.providers.one.index, { id }));
        },
      }
    );
  };

  return (
    <InfoBlock
      title={t('account:providers.socials.title')}
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
                  message: t('account:providers.socials.form.type.error.empty'),
                },
              })}
              label={t('account:providers.socials.form.type.label')}
              error={errors.type?.message}
              options={socials.map((type) => ({
                label: t(`socials:${type}`),
                value: type,
              }))}
            />

            <TextInput
              {...register('url', {
                required: {
                  value: true,
                  message: t('account:providers.socials.form.url.error.empty'),
                },
              })}
              label={t('account:providers.socials.form.url.label')}
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
              href={generateUrl(routes.account.providers.one.index, { id })}
            />

            <Button
              as="button"
              label={t('common:actions.save')}
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
