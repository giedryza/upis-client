import { ComponentType } from 'react';

import { FormInfo } from 'components/users/company/form-info/form-info.component';
import { FormNetwork } from 'components/users/company/form-network/form-network.component';
import { CompanyFormStep } from 'domain/companies/companies.types';

export const FORM_BY_STEP: Record<CompanyFormStep, ComponentType> = {
  [CompanyFormStep.Info]: FormInfo,
  [CompanyFormStep.Network]: FormNetwork,
  [CompanyFormStep.Logo]: FormNetwork,
  [CompanyFormStep.Location]: FormNetwork,
  [CompanyFormStep.Tours]: FormNetwork,
};
