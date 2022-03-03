import { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { useProtectedPage } from 'tools/hooks';
import { AppHead } from 'ui';
import { AccountLayout } from 'layouts';
import { Profile } from 'components/account';
import { MainLayout } from 'components/layouts/main/main.layout';

const ProfilePage: NextPage = () => {
  const { t } = useTranslation();

  useProtectedPage();

  return (
    <MainLayout>
      <AppHead title={t('account:profile.title')} />

      <AccountLayout>
        <Profile />
      </AccountLayout>
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

export default ProfilePage;
