import { RadioGroupState } from 'react-stately';

import { contextFactory } from 'tools/common';

const [useButtonGroupContext, ButtonGroupContextProvider] =
  contextFactory<RadioGroupState>();

export { useButtonGroupContext, ButtonGroupContextProvider };
