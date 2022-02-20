import { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { useProtectedPage } from 'tools/hooks';
import { MainLayout } from 'components/layouts/main/main.layout';
import { Profile } from 'components/users/profile/profile.component';
import { AppHead } from 'ui/app-head/app-head.component';
import { AccountContainer } from 'components/users/account-container/account-container.component';

const ProfilePage: NextPage = () => {
  const { t } = useTranslation();

  useProtectedPage();

  return (
    <MainLayout>
      <AppHead title={t('users:profile.title')} />

      <AccountContainer>
        <Profile />
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

export default ProfilePage;
