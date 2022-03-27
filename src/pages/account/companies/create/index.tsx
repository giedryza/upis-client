import { GetServerSideProps, NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { getSession } from 'next-auth/react';

import { routes } from 'config/routes';
import { useProtectedPage } from 'tools/hooks';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import { AppHead, Breadcrumbs } from 'ui';
import { CompanyCreate } from 'components/account';

const CompanyCreatePage: NextPage = () => {
  const { t } = useTranslation();

  useProtectedPage();

  return (
    <>
      <AppHead title={t('account:companies.title', { count: 1 })} />

      <MainLayout>
        <PageLayout>
          <Breadcrumbs
            items={[
              { label: t('account:title'), url: routes.account.profile.index },
              {
                label: t('account:companies.title', { count: 2 }),
                url: routes.account.companies.index,
              },
              {
                label: t('common:actions.create'),
              },
            ]}
          />

          <AccountLayout>
            <CompanyCreate />
          </AccountLayout>
        </PageLayout>
      </MainLayout>
    </>
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

export default CompanyCreatePage;
