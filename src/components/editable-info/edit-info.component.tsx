import { FC, ReactNode, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import styles from './edit-info.module.scss';

import { IconName } from 'ui/icon/icon.component';
import { Button } from 'ui/button/button.component';
import { InfoBlock } from 'components/editable-info/info-block/info-block.component';
import { EditBlock } from 'components/editable-info/edit-block/edit-block.component';

interface Props {
  id: string;
  label: string;
  value: string;
  form?: ReactNode;
  isValid?: boolean;
  icon?: IconName;
}

const EditInfo: FC<Props> = ({
  id,
  label,
  value,
  form = null,
  isValid,
  icon,
}) => {
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => setIsEditing((prevState) => !prevState);

  const actions = form ? (
    <Button
      label={t('common:actions.edit')}
      icon={IconName.Pencil}
      styleType="link"
      size="sm"
      onClick={toggleEditing}
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
        />
      ) : (
        <InfoBlock info={value} label={label} icon={icon} actions={actions} />
      )}
    </div>
  );
};

export { EditInfo };
