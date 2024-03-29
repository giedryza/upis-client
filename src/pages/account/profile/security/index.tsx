import { NextPage, GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config';
import { authOptions, generateUrl } from 'tools/services';
import { useProtectedPage } from 'tools/hooks';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import { AccountNavigation, ProfileEditSecurity } from 'components/account';

const ProfileEditSecurityPage: NextPage = () => {
  const { t } = useTranslation();

  useProtectedPage(['pending', 'user', 'manager', 'admin']);

  return (
    <>
      <AppHead title={t('account:profile.title')} />

      <MainLayout>
        <AccountNavigation />

        <PageLayout>
          <Breadcrumbs
            items={[
              {
                label: t('account:title'),
                url: generateUrl(routes.account.profile.index),
              },
              {
                label: t('account:profile.title'),
                url: generateUrl(routes.account.profile.index),
              },
              {
                label: t('account:profile.security.title'),
              },
            ]}
          />

          <AccountLayout>
            <ProfileEditSecurity />
          </AccountLayout>
        </PageLayout>
      </MainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: generateUrl(routes.home),
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

export default ProfileEditSecurityPage;
