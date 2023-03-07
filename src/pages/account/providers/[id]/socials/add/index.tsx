import { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { parameters, routes } from 'config';
import { useProtectedPage } from 'tools/hooks';
import { generateUrl } from 'tools/common';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import { ProviderEditSocialLinksAdd } from 'components/account';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

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
  const { query } = useRouter();

  const { id } =
    parameters[routes.account.providers.one.socials.add].parse(query);

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
