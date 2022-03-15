import { useEffect, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, IconName, SelectInput, TextInput } from 'ui';
import { routes } from 'config/routes';
import { getRouteParam } from 'tools/common/get-route-param';
import { InfoBlock } from 'components/account/atoms';
import { useUpdateSocialLink } from 'domain/companies/companies.mutations';
import { useActiveSocialLink } from 'domain/companies/companies.queries';
import { SocialType } from 'domain/companies/companies.types';

import { Values } from './company-edit-social-links-edit.types';
import { INITIAL_VALUES } from './company-edit-social-links-edit.constants';
import styles from './company-edit-social-links-edit.module.scss';

export const CompanyEditSocialLinksEdit: VFC = () => {
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

  const { data: socialLink } = useActiveSocialLink();
  const { mutate: updateSocialLink, isLoading } = useUpdateSocialLink({
    onSuccess: () => {
      push(routes.account.companies.one.index.replace(':slug', slug));
    },
  });

  useEffect(() => {
    reset({
      type: socialLink?.type,
      url: socialLink?.url,
    });
  }, [reset, socialLink]);

  const onSubmit: SubmitHandler<Values> = ({ type, url }) => {
    const id = socialLink?._id;

    if (!id) return;

    updateSocialLink({ id, form: { type, url } });
  };

  return (
    <div className={styles.content}>
      <InfoBlock
        title={t('account:companies.socialLinks.title')}
        icon={IconName.Network}
        columns={1}
      >
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset} disabled={isLoading}>
            <SelectInput
              {...register('type', {
                required: {
                  value: true,
                  message: t(
                    'account:companies.socialLinks.form.type.error.empty'
                  ),
                },
              })}
              label={t('account:companies.socialLinks.form.type.label')}
              error={errors.type?.message}
              options={Object.values(SocialType).map((type) => ({
                label: t(`common:social.${type}`),
                value: type,
              }))}
            />

            <TextInput
              {...register('url', {
                required: {
                  value: true,
                  message: t(
                    'account:companies.socialLinks.form.url.error.empty'
                  ),
                },
              })}
              label={t('account:companies.socialLinks.form.url.label')}
              placeholder="https://upis.lt"
              type="url"
              error={errors.url?.message}
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