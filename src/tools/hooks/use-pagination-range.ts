import { useMemo } from 'react';

const getRange = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => i + start);

type UsePagination = (options: {
  totalPages: number;
  currentPage: number;
  siblingCount: number;
}) => { range: number[] };

export const usePaginationRange: UsePagination = ({
  totalPages,
  currentPage,
  siblingCount,
}) => {
  const range = useMemo(() => {
    const totalPageNumbers =
      siblingCount +
      [
        ...Array.from({ length: siblingCount }),
        'firstPage',
        'lastPage',
        'currentPage',
        'dots',
        'dots',
      ].length;

    /*
      Case 1:
      Full pagination
    */
    if (totalPageNumbers >= totalPages) {
      return getRange(1, totalPages);
    }

    // Calculate left and right sibling index and make sure they are within range 1 and totalPages
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    // Do not show dots when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPages. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPages - 2
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    /*
    	Case 2:
      No left dots, right dots visible
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = getRange(1, leftItemCount);

      return [...leftRange, NaN, totalPages];
    }

    /*
    	Case 3:
      No right dots, left dots visible
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = getRange(totalPages - rightItemCount + 1, totalPages);

      return [1, NaN, ...rightRange];
    }

    /*
    	Case 4:
      Left dots visible, right dots visible
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = getRange(leftSiblingIndex, rightSiblingIndex);

      return [1, NaN, ...middleRange, NaN, totalPages];
    }

    return [];
  }, [currentPage, siblingCount, totalPages]);

  return { range };
};
