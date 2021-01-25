import { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';

import { MainLayout } from 'components/layouts/main/main.layout';
import { AppHead } from 'ui/app-head/app-head.component';
import { AccountContainer } from 'components/users/account-container/account-container.component';
import { Company } from 'components/users/company/company.component';

const CompanyPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <AppHead title={t('users:company.title')} />

      <AccountContainer>
        <Company />
      </AccountContainer>
    </MainLayout>
  );
};

export default CompanyPage;
