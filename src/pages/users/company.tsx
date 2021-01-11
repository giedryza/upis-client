import { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';

import { MainLayout } from 'components/layouts/main/main.layout';
import { AppHead } from 'ui/app-head/app-head.component';
import { AccountContainer } from 'components/users/account-container/account-container.component';

const CompanyPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <AppHead title={t('users:company.title')} />

      <AccountContainer>company</AccountContainer>
    </MainLayout>
  );
};

export default CompanyPage;
