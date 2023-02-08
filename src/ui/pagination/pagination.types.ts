import { LinkProps } from 'next/link';

export interface Props {
  totalPages: number;
  currentPage: number;
  onLink: (page: number) => LinkProps['href'];
}
