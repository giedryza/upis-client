import { FC, ReactNode, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import styles from './editable-info.module.scss';

import { IconName } from 'ui/icon/icon.component';
import { Button } from 'ui/button/button.component';
import { InfoBlock } from 'components/editable-info/info-block/info-block.component';
import { EditBlock } from 'components/editable-info/edit-block/edit-block.component';

interface Props {
  id: string;
  form: ReactNode;
  label: string;
  value: string;
  isValid?: boolean;
  icon?: IconName;
}

const EditableInfo: FC<Props> = ({ id, label, value, form, isValid, icon }) => {
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => setIsEditing((prevState) => !prevState);

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
        <InfoBlock
          info={value}
          label={label}
          icon={icon}
          actions={
            <Button
              label={t('common:actions.edit')}
              icon={IconName.Pencil}
              styleType="link"
              size="sm"
              onClick={toggleEditing}
            />
          }
        />
      )}
    </div>
  );
};

export { EditableInfo };
