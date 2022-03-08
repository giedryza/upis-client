import { VFC } from 'react';

import { FormSocialLink } from 'components/account/companies/company-edit/form-social-link/form-social-link.component';
import { FormSocialLinkAdd } from 'components/account/companies/company-edit/form-social-link-add/form-social-link-add.component';
import { useMyCompany } from 'domain/companies/companies.queries';

import { ComponentProps } from './social-links.types';

export const SocialLinks: VFC<ComponentProps> = ({ companyId }) => {
  const { data: company } = useMyCompany();

  return (
    <>
      {company?.socialLinks.map((link) => (
        <FormSocialLink
          companyId={companyId}
          socialLinkId={link._id}
          key={link._id}
        />
      ))}
      <FormSocialLinkAdd companyId={companyId} />
    </>
  );
};
