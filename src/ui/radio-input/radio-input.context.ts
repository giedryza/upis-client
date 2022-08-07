import { RadioGroupState } from 'react-stately';

import { contextFactory } from 'tools/common';

const [useRadioContext, RadioContextProvider] =
  contextFactory<RadioGroupState>();

export { useRadioContext, RadioContextProvider };
