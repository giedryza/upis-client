import { useRef, useState } from 'react';

import { isServer } from 'tools/common';
import { useEventListener } from 'tools/hooks/use-event-listener';

const getMediaQueryList = (query: string) =>
  isServer() ? null : window.matchMedia(query);

const isMatch = (query: string) => {
  const mediaQueryList = getMediaQueryList(query);

  return mediaQueryList ? mediaQueryList.matches : false;
};

export const useMediaQuery = (query: string): { matches: boolean } => {
  const mediaQueryListRef = useRef<MediaQueryList>(getMediaQueryList(query));
  const [matches, setMatches] = useState(isMatch(query));

  const handleChange = () => {
    setMatches(isMatch(query));
  };

  useEventListener('change', handleChange, mediaQueryListRef);

  return { matches };
};
