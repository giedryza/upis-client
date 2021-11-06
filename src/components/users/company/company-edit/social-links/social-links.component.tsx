import { VFC } from 'react';
import { useSelector } from 'react-redux';

import { ComponentProps } from './social-links.types';

import { selectMyCompanySocialLinks } from 'domain/companies/companies.selectors';
import { FormSocialLink } from 'components/users/company/company-edit/form-social-link/form-social-link.component';
import { FormSocialLinkAdd } from 'components/users/company/company-edit/form-social-link-add/form-social-link-add.component';

export const SocialLinks: VFC<ComponentProps> = ({ companyId }) => {
  const socialLinks = useSelector(selectMyCompanySocialLinks);

  return (
    <div>
      {socialLinks.map((link) => (
        <FormSocialLink
          companyId={companyId}
          socialLinkId={link._id}
          key={link._id}
        />
      ))}
      <FormSocialLinkAdd companyId={companyId} />
    </div>
  );
};
