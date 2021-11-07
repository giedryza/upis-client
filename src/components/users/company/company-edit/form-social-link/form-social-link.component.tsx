import { VFC } from 'react';
import { useDispatch } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';

import styles from './form-social-link.module.scss';

import { EditInfo } from 'components/editable-info/edit-info.component';
import {
  ComponentProps,
  FormSocialLinkValues,
} from 'components/users/company/company-edit/form-social-link/form-social-link.types';
import { thunks } from 'domain/thunks';
import { TextInput } from 'ui/text-input/text-input.component';
import { SelectInput } from 'ui/select-input/select-input.component';
import {
  useFormSocialLink,
  useValues,
} from 'components/users/company/company-edit/form-social-link/form-social-link.hooks';
import { SocialType } from 'domain/companies/companies.types';
import { ICON_BY_SOCIAL_LINK_TYPE } from 'components/users/company/company-edit/form-social-link/form-social-link.constants';

export const FormSocialLink: VFC<ComponentProps> = ({ socialLinkId }) => {
  const formId = 'form-social-link';

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const values = useValues(socialLinkId);

  const onSubmit = ({ type, url }: FormSocialLinkValues) => {
    dispatch(thunks.companies.updateSocialLink({ type, url }, socialLinkId));
  };

  const onDelete = () => {
    dispatch(thunks.companies.deleteSocialLink(socialLinkId));
  };

  const { handleSubmit, refs, errorMessages, isDisabled } = useFormSocialLink(
    onSubmit,
    values
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
