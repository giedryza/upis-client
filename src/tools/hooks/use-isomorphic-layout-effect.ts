import { useEffect, useLayoutEffect } from 'react';

import { isServer } from 'tools/common';

export const useIsomorphicLayoutEffect = !isServer()
  ? useLayoutEffect
  : useEffect;
