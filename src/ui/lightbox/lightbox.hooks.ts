import { useEffect, useState } from 'react';

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(
    !!document.fullscreenElement
  );

  useEffect(() => {
    const listener = <E extends Event>(_e: E) => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', listener);

    return () => {
      document.removeEventListener('fullscreenchange', listener);
    };
  }, []);

  return { isFullscreen };
};
