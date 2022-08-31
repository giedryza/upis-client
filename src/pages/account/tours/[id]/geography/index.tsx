import { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { useProtectedPage } from 'tools/hooks';
import { getRouteParam } from 'tools/common';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import { TourEditGeography } from 'components/account';
import { toursKeys, getLoaders } from 'domain/tours';

const TourEditGeographyPage: NextPage = () => {
  const { t } = useTranslation();
  const { query } = useRouter();

  const id = getRouteParam(query.id);

  useProtectedPage();

  return (
    <>
      <AppHead title={t('account:tours.title', { count: 1 })} />

      <MainLayout>
        <PageLayout>
          <Breadcrumbs
            items={[
              { label: t('account:title'), url: routes.account.profile.index },
              {
                label: t('account:tours.title', { count: 2 }),
                url: routes.account.tours.index,
              },
              {
                label: id,
                url: routes.account.tours.one.index.replace(':id', id),
              },
              {
                label: t('account:tours.geography.title'),
              },
            ]}
          />

          <AccountLayout>
            <TourEditGeography />
          </AccountLayout>
        </PageLayout>
      </MainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
  locale,
}) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: routes.home,
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  const id = getRouteParam(params?.id);
  const { loaders } = getLoaders(locale);

  await queryClient.prefetchQuery(toursKeys.detail(id), () =>
    loaders.getTour({ req, id })
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default TourEditGeographyPage;
