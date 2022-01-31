import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSelector } from 'react-redux';

import { EditInfo } from 'components/editable-info/edit-info.component';
import { IconName } from 'ui/icon';
import { getUser } from 'domain/auth/auth.selectors';

interface Props {
  id: string;
}

const EditEmail: FC<Props> = ({ id }) => {
  const { t } = useTranslation();

  const user = useSelector(getUser);

  return (
    <EditInfo
      id={id}
      label={t('users:form.email')}
      value={user?.email ?? '-'}
      icon={IconName.Mail}
    />
  );
};

export { EditEmail };
