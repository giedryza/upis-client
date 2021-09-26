import { VFC } from 'react';
import { useDispatch } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';

import styles from './form-network.module.scss';
import { useValues, useCompanyFormNetwork } from './form-network.hooks';

import { TextInput } from 'ui/text-input/text-input.component';
import { Button } from 'ui/button/button.component';
import { thunks } from 'domain/thunks';
import { CompanyFormNetworkValues } from 'components/users/company/form-network/form-network.types';

const FormNetwork: VFC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const values = useValues();

  const onSubmit = ({ website }: CompanyFormNetworkValues) => {
    dispatch(thunks.companies.submitAdditionalStep({ website }));
  };

  const {
    handleSubmit,
    refs,
    errorMessages,
    isDisabled,
  } = useCompanyFormNetwork(onSubmit, values);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <TextInput
          {...refs.website}
          label={t('users:company.form.website.label')}
          error={errorMessages.website}
        />
      </div>

      <div className={styles.actions}>
        <Button
          label={t('common:actions.next')}
          styleType="primary"
          type="submit"
          disabled={isDisabled}
        />
      </div>
    </form>
  );
};

export { FormNetwork };
