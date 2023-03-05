import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import useTranslation from 'next-translate/useTranslation';

import { parameters, routes } from 'config';
import { useProtectedPage } from 'tools/hooks';
import { generateUrl } from 'tools/common';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import { ProviderEditSocialLinksEdit } from 'components/account';
import { getLoaders, providersKeys } from 'domain/providers';

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
  const { id } =
    parameters[routes.account.providers.one.socials.one].parse(params);
  const { loaders } = getLoaders(locale);

  await queryClient.prefetchQuery(providersKeys.detail(id), () =>
    loaders.getProvider({ req, id })
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
      params: { id },
    },
  };
};

const ProviderEditSocialLinksEditPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ params }) => {
  const { t } = useTranslation();

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
                label: params.id,
                url: generateUrl(routes.account.providers.one.index, {
                  id: params.id,
                }),
              },
              {
                label: t('account:providers.socials.title'),
              },
            ]}
          />

          <AccountLayout>
            <ProviderEditSocialLinksEdit />
          </AccountLayout>
        </PageLayout>
      </MainLayout>
    </>
  );
};

export default ProviderEditSocialLinksEditPage;