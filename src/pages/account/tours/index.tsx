import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { useProtectedPage } from 'tools/hooks';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, AccountPageLayout } from 'layouts';
import { Tours } from 'components/account';

const ToursPage: NextPage = () => {
  const { t } = useTranslation();

  useProtectedPage();

  return (
    <>
      <AppHead title={t('account:tours.title')} />

      <MainLayout>
        <AccountPageLayout>
          <Breadcrumbs
            items={[
              { label: t('account:title'), url: routes.account.profile.index },
              { label: t('account:tours.title') },
            ]}
          />

          <AccountLayout>
            <Tours />
          </AccountLayout>
        </AccountPageLayout>
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

export default ToursPage;
