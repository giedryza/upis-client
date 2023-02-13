import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useIsNavigating = () => {
  const { events } = useRouter();

  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    events.on('routeChangeStart', () => setIsNavigating(true));

    events.on('routeChangeComplete', () => setIsNavigating(false));
    events.on('routeChangeError', () => setIsNavigating(false));
  }, [events]);

  return { isNavigating };
};
