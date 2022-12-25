import { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { useProtectedPage } from 'tools/hooks';
import { generateUrl, getRouteParam } from 'tools/common';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import { ProviderEditAmenitiesEdit } from 'components/account';
import { amenitiesKeys, getLoaders } from 'domain/amenities';

const ProviderEditAmenitiesEditPage: NextPage = () => {
  const { t } = useTranslation();
  const { query } = useRouter();

  const id = getRouteParam(query.id);

  useProtectedPage();

  return (
    <>
      <AppHead title={t('account:providers.title', { count: 1 })} />

      <MainLayout>
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
                label: t('account:providers.amenities.title'),
              },
            ]}
          />

          <AccountLayout>
            <ProviderEditAmenitiesEdit />
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
        destination: generateUrl(routes.home),
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  const id = getRouteParam(params?.amenityId);

  const { loaders } = getLoaders(locale);

  await queryClient.prefetchQuery(amenitiesKeys.detail(id), () =>
    loaders.getAmenity({ req, id })
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProviderEditAmenitiesEditPage;
