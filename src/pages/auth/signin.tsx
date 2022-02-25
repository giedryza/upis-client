import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

import { MainLayout } from 'components/layouts/main/main.layout';
import { Signin } from 'components/account/signin/signin.component';
import { AppHead } from 'ui';
import { useGuestPage } from 'tools/hooks';
import { routes } from 'config/routes';

const SigninPage: NextPage = () => {
  const { t } = useTranslation();

  useGuestPage();

  return (
    <MainLayout>
      <AppHead title={t('auth:layout.signin')} />
      <Signin />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
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

export default SigninPage;
