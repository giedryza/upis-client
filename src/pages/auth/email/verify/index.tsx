import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth/next';
import useTranslation from 'next-translate/useTranslation';

import { AppHead } from 'ui';
import { EmailVerify } from 'components/auth';
import { PageLayout, MainLayout } from 'layouts';
import { authOptions } from 'tools/services';

const EmailVerifyPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <AppHead title={t('auth:email_verify.title')} />

      <MainLayout>
        <PageLayout>
          <main id="main">
            <EmailVerify />
          </main>
        </PageLayout>
      </MainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  return {
    props: {
      session,
    },
  };
};

export default EmailVerifyPage;
