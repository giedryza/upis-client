import { FC, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button } from 'ui/button';

import styles from './edit-info.module.scss';
import { Props } from './edit-info.types';
import { ICON_BY_VARIANT } from './edit-info.constants';
import { InfoBlock } from './info-block/info-block.component';
import { EditBlock } from './edit-block/edit-block.component';

const EditInfo: FC<Props> = ({
  id,
  label,
  value,
  form = null,
  isValid,
  icon,
  variant = 'edit',
  onDelete,
}) => {
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => setIsEditing((prevState) => !prevState);

  const actions = form ? (
    <Button
      label={t(`common:actions.${variant}`)}
      icon={ICON_BY_VARIANT[variant]}
      variant="link"
      size="sm"
      attributes={{
        onClick: toggleEditing,
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>
      {isEditing ? (
        <EditBlock
          id={id}
          onCancel={toggleEditing}
          form={form}
          isValid={isValid}
          onDelete={onDelete}
        />
      ) : (
        <InfoBlock
          info={value || '-'}
          label={label || '-'}
          icon={icon}
          actions={actions}
          variant={variant}
        />
      )}
    </div>
  );
};

export { EditInfo };
