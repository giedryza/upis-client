import { NextPage, GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config';
import { useRouteParams, generateUrl, authOptions } from 'tools/services';
import { useProtectedPage } from 'tools/hooks';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import {
  AccountNavigation,
  ProviderEditSocialLinksAdd,
} from 'components/account';

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

const ProviderEditSocialLinksAddPage: NextPage = () => {
  const { t } = useTranslation();
  const { id } = useRouteParams(routes.account.providers.one.socials.add);

  useProtectedPage(['manager', 'admin']);

  return (
    <>
      <AppHead title={t('account:providers.title', { count: 1 })} />

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
                label: t('account:providers.title', { count: 2 }),
                url: generateUrl(routes.account.providers.index),
              },
              {
                label: id,
                url: generateUrl(routes.account.providers.one.index, { id }),
              },
              {
                label: t('account:providers.socials.title'),
              },
            ]}
          />

          <AccountLayout>
            <ProviderEditSocialLinksAdd />
          </AccountLayout>
        </PageLayout>
      </MainLayout>
    </>
  );
};

export default ProviderEditSocialLinksAddPage;
