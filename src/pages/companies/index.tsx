import { NextPage } from 'next';

import { MainLayout } from 'layouts/main/main.layout';
import { Companies } from 'components/companies/companies.component';
import { AppHead } from 'ui/app-head/app-head.component';

const CompaniesPage: NextPage = () => {
  return (
    <MainLayout>
      <AppHead />
      <Companies />
    </MainLayout>
  );
};

export default CompaniesPage;
