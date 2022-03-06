import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/react';

import { EditInfo } from 'components/editable-info/edit-info.component';
import { IconName } from 'ui';

interface Props {
  id: string;
}

const EditEmail: FC<Props> = ({ id }) => {
  const { t } = useTranslation();

  const { data: session } = useSession();

  return (
    <EditInfo
      id={id}
      label={t('account:general.form.email.label')}
      value={session?.user?.email ?? '-'}
      icon={IconName.Mail}
    />
  );
};

export { EditEmail };
