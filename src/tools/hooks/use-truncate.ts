import { useState } from 'react';

interface UseTruncate {
  text: string;
  maxLength: number;
  ellipsis?: string;
}

export const useTruncate = ({
  text,
  maxLength,
  ellipsis = '...',
}: UseTruncate) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const shouldTruncate = text.length > maxLength;

  return {
    text:
      shouldTruncate && isTruncated
        ? `${text.substring(0, maxLength)}${ellipsis}`
        : text,
    isTruncated,
    shouldTruncate,
    onTruncate: setIsTruncated,
  };
};
