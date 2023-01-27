import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { CheckboxInput } from 'ui';

import { Props } from './updates-control.types';
import styles from './updates-control.module.scss';

export const UpdatesControl: FC<Props> = ({ updateOnMapMove, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <CheckboxInput
        label={t('serp:map.actions.update-on-move')}
        variant="primary"
        checked={updateOnMapMove}
        onChange={onChange}
      />
    </div>
  );
};
