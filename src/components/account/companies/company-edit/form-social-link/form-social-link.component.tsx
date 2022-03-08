import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { EditInfo } from 'components/editable-info/edit-info.component';
import {
  ComponentProps,
  FormSocialLinkValues,
} from 'components/account/company/company-edit/form-social-link/form-social-link.types';
import { TextInput, SelectInput } from 'ui';
import {
  useFormSocialLink,
  useValues,
} from 'components/account/company/company-edit/form-social-link/form-social-link.hooks';
import { SocialType } from 'domain/companies/companies.types';
import { ICON_BY_SOCIAL_LINK_TYPE } from 'components/account/company/company-edit/form-social-link/form-social-link.constants';
import {
  useDeleteSocialLink,
  useUpdateSocialLink,
} from 'domain/companies/companies.mutations';

import styles from './form-social-link.module.scss';

export const FormSocialLink: VFC<ComponentProps> = ({ socialLinkId }) => {
  const formId = 'form-social-link';

  const { t } = useTranslation();

  const values = useValues(socialLinkId);

  const { mutate: updateSocialLink } = useUpdateSocialLink();
  const { mutate: deleteSocialLink } = useDeleteSocialLink();

  const onSubmit = ({ type, url }: FormSocialLinkValues) => {
    updateSocialLink({ form: { type, url }, socialLinkId });
  };

  const onDelete = () => {
    deleteSocialLink({ socialLinkId });
  };

  const { handleSubmit, refs, errorMessages, isDisabled } = useFormSocialLink(
    onSubmit,
    values
  );

  const form = (
    <form id={formId} className={styles.form} onSubmit={handleSubmit}>
      <TextInput
        {...refs.url}
        label={t('account:company.form.socialLinks.url.label')}
        error={errorMessages.url}
      />
      <SelectInput
        {...refs.type}
        label={t('account:company.form.socialLinks.type.label')}
        options={Object.values(SocialType).map((type) => ({
          label: t(`common:social.${type}`),
          value: type,
        }))}
      />
    </form>
  );

  return (
    <EditInfo
      id={formId}
      label={t(`common:social.${values.type}`)}
      form={form}
      value={values.url}
      isValid={!isDisabled}
      icon={ICON_BY_SOCIAL_LINK_TYPE[values.type]}
      onDelete={onDelete}
    />
  );
};
