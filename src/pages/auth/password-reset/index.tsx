import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { useGuestPage } from 'tools/hooks';
import { AppHead } from 'ui';
import { Signin } from 'components/auth';
import { PageLayout, MainLayout } from 'layouts';

const PasswordReset: NextPage = () => {
  const { t } = useTranslation();

  useGuestPage();

  return (
    <>
      <AppHead title={t('auth:signin.title')} />

      <MainLayout>
        <PageLayout>
          <div>labas</div>
        </PageLayout>
      </MainLayout>
    </>
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

export default PasswordReset;
