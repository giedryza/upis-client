import { GetServerSideProps, NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { getSession } from 'next-auth/react';

import { routes } from 'config/routes';
import { useProtectedPage } from 'tools/hooks';
import { MainLayout } from 'components/layouts/main/main.layout';
import { AppHead } from 'ui/app-head/app-head.component';
import { AccountContainer } from 'components/users/account-container/account-container.component';
import { Company } from 'components/users/company/company.component';

const CompanyPage: NextPage = () => {
  const { t } = useTranslation();

  useProtectedPage();

  return (
    <MainLayout>
      <AppHead title={t('users:company.title')} />

      <AccountContainer>
        <Company />
      </AccountContainer>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: routes.home,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default CompanyPage;
