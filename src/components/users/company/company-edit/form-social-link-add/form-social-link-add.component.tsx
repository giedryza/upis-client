import { VFC } from 'react';
import { useDispatch } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';

import styles from './form-social-link-add.module.scss';
import {
  ComponentProps,
  FormSocialLinkAddValues,
} from './form-social-link-add.types';
import { useFormSocialLinkAdd } from './form-social-link-add.hooks';
import { FORM_SOCIAL_LINK_ADD_INITIAL_VALUES } from './form-social-link-add.constants';

import { EditInfo } from 'components/editable-info/edit-info.component';
import { thunks } from 'domain/thunks';
import { TextInput } from 'ui/text-input/text-input.component';
import { SelectInput } from 'ui/select-input/select-input.component';
import { SocialType } from 'domain/companies/companies.types';

export const FormSocialLinkAdd: VFC<ComponentProps> = ({ companyId }) => {
  const formId = 'form-social-link-add';

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSubmit = ({ type, url }: FormSocialLinkAddValues) => {
    dispatch(thunks.companies.addSocialLink({ type, url }, companyId));
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
