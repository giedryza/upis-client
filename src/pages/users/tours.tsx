import { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';

import { MainLayout } from 'components/layouts/main/main.layout';
import { AppHead } from 'ui/app-head/app-head.component';
import { AccountContainer } from 'components/users/account-container/account-container.component';

const ToursPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <AppHead title={t('users:tours.title')} />

      <AccountContainer>tours</AccountContainer>
    </MainLayout>
  );
};

export default ToursPage;
