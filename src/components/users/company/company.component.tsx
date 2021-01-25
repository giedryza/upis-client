import { FC } from 'react';

import { FormSteps } from 'ui/form-steps/form-steps.component';

const Company: FC = () => {
  return (
    <div>
      <FormSteps total={5} current={3} />
    </div>
  );
};

export { Company };
