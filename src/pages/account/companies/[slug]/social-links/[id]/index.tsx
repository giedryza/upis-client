import { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { useProtectedPage } from 'tools/hooks';
import { capitalizeFirstLetter, getRouteParam } from 'tools/common';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, AccountPageLayout } from 'layouts';
import { CompanyEditSocialLinksEdit } from 'components/account';
import { socialLinksKeys } from 'domain/social-links/social-links.keys';
import { adapters } from 'domain/social-links/social-links.adapters';

const CompanyEditSocialLinksEditPage: NextPage = () => {
  const { t } = useTranslation();
  const { query } = useRouter();

  const slug = getRouteParam(query.slug);

  useProtectedPage();

  return (
    <>
      <AppHead title={t('account:companies.title', { count: 1 })} />

      <MainLayout>
        <AccountPageLayout>
          <Breadcrumbs
            items={[
              { label: t('account:title'), url: routes.account.profile.index },
              {
                label: t('account:companies.title', { count: 2 }),
                url: routes.account.companies.index,
              },
              {
                label: capitalizeFirstLetter(slug.split('-').join(' ')),
                url: routes.account.companies.one.index.replace(':slug', slug),
              },
              {
                label: t('account:companies.socialLinks.title'),
              },
            ]}
          />

          <AccountLayout>
            <CompanyEditSocialLinksEdit />
          </AccountLayout>
        </AccountPageLayout>
      </MainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
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

  await queryClient.prefetchQuery(socialLinksKeys.detail(id), () =>
    adapters.getSocialLink({ req, id })
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CompanyEditSocialLinksEditPage;
