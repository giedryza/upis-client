import { GetServerSideProps, NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { getSession } from 'next-auth/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { routes } from 'config';
import { useProtectedPage } from 'tools/hooks';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import { Providers } from 'components/account';
import { providersKeys, getLoaders } from 'domain/providers';
import { generateUrl } from 'tools/common';
import { getQueryParams } from 'tools/services/url';

const ProvidersPage: NextPage = () => {
  const { t } = useTranslation();

  useProtectedPage();

  return (
    <>
      <AppHead title={t('account:providers.title', { count: 2 })} />

      <MainLayout>
        <PageLayout>
          <Breadcrumbs
            items={[
              {
                label: t('account:title'),
                url: generateUrl(routes.account.profile.index),
              },
              { label: t('account:providers.title', { count: 2 }) },
            ]}
          />

          <AccountLayout>
            <Providers />
          </AccountLayout>
        </PageLayout>
      </MainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
  locale,
}) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: generateUrl(routes.home),
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  const { loaders } = getLoaders(locale);
  const filters = getQueryParams(routes.account.providers.index, query);

  await queryClient.prefetchQuery(
    providersKeys.list({ ...filters, user: session.user.id }),
    () =>
      loaders.getProviders({ params: { ...filters, user: session.user.id } })
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProvidersPage;
