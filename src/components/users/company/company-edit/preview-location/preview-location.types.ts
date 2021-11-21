import { Point } from 'types/common/geo';

export interface Props {
  center: Point;
  address: string;
  onClick: () => void;
}
