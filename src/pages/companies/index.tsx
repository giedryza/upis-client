import { NextPage } from 'next';

import { MainLayout } from 'components/layouts/main/main.layout';
import { Companies } from 'components/companies/companies.component';
import { AppHead } from 'ui';

const CompaniesPage: NextPage = () => {
  return (
    <MainLayout>
      <AppHead />
      <Companies />
    </MainLayout>
  );
};

export default CompaniesPage;
