import { CheckboxGroupState } from 'react-stately';

import { contextFactory } from 'tools/common';

const [useCheckboxContext, CheckboxContextProvider] =
  contextFactory<CheckboxGroupState>();

export { useCheckboxContext, CheckboxContextProvider };
