import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { EditInfo } from 'components/editable-info/edit-info.component';
import { TextInput } from 'ui/text-input';
import { SelectInput } from 'ui/select-input';
import { SocialType } from 'domain/companies/companies.types';
import { useAddSocialLink } from 'domain/companies/companies.mutations';

import { FORM_SOCIAL_LINK_ADD_INITIAL_VALUES } from './form-social-link-add.constants';
import { useFormSocialLinkAdd } from './form-social-link-add.hooks';
import {
  ComponentProps,
  FormSocialLinkAddValues,
} from './form-social-link-add.types';
import styles from './form-social-link-add.module.scss';

export const FormSocialLinkAdd: VFC<ComponentProps> = ({ companyId }) => {
  const formId = 'form-social-link-add';

  const { t } = useTranslation();

  const { mutate: addSocialLink } = useAddSocialLink();

  const onSubmit = ({ type, url }: FormSocialLinkAddValues) => {
    addSocialLink({ form: { type, url }, companyId });
  };

  const { handleSubmit, refs, errorMessages } = useFormSocialLinkAdd(
    onSubmit,
    FORM_SOCIAL_LINK_ADD_INITIAL_VALUES
  );

  const form = (
    <form id={formId} className={styles.form} onSubmit={handleSubmit}>
      <TextInput
        {...refs.url}
        label={t('users:company.form.socialLinks.url.label')}
        error={errorMessages.url}
      />
      <SelectInput
        {...refs.type}
        label={t('users:company.form.socialLinks.type.label')}
        options={Object.values(SocialType).map((type) => ({
          label: t(`common:social.${type}`),
          value: type,
        }))}
      />
    </form>
  );

  return <EditInfo id={formId} form={form} variant="add" />;
};
