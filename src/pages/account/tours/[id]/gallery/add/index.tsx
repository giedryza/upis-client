import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config';
import { getParams } from 'tools/services/url';
import { useProtectedPage } from 'tools/hooks';
import { generateUrl } from 'tools/common';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import { TourEditGalleryAdd } from 'components/account';
import { toursKeys, getLoaders } from 'domain/tours';

interface Props {
  session: Session;
  dehydratedState: DehydratedState;
  params: { id: string };
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
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
  const { id } = getParams(routes.account.tours.one.gallery.add, params);
  const { loaders } = getLoaders(locale);

  await queryClient.prefetchQuery(toursKeys.detail(id), () =>
    loaders.getTour({ req, id })
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
      params: { id },
    },
  };
};

const TourEditGalleryPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ params }) => {
  const { t } = useTranslation();

  useProtectedPage();

  return (
    <>
      <AppHead title={t('account:tours.title', { count: 1 })} />

      <MainLayout>
        <PageLayout>
          <Breadcrumbs
            items={[
              {
                label: t('account:title'),
                url: generateUrl(routes.account.profile.index),
              },
              {
                label: t('account:tours.title', { count: 2 }),
                url: generateUrl(routes.account.tours.index),
              },
              {
                label: params.id,
                url: generateUrl(routes.account.tours.one.index, {
                  id: params.id,
                }),
              },
              {
                label: t('account:tours.gallery.title'),
              },
            ]}
          />

          <AccountLayout>
            <TourEditGalleryAdd />
          </AccountLayout>
        </PageLayout>
      </MainLayout>
    </>
  );
};

export default TourEditGalleryPage;
