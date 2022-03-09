import { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { useProtectedPage } from 'tools/hooks';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, AccountPageLayout } from 'layouts';
import { Security } from 'components/account';

const SecurityPage: NextPage = () => {
  const { t } = useTranslation();

  useProtectedPage();

  return (
    <>
      <AppHead title={t('account:profile.title')} />

      <MainLayout>
        <AccountPageLayout>
          <Breadcrumbs
            items={[
              {
                label: t('account:title'),
                url: routes.account.profile.index,
              },
              {
                label: t('account:profile.title'),
                url: routes.account.profile.index,
              },
              {
                label: t('account:security.title'),
              },
            ]}
          />

          <AccountLayout>
            <Security />
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

export default SecurityPage;
