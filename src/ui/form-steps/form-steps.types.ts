export enum Step {
  Current = 'current',
  Completed = 'completed',
}

export interface Props {
  total: number;
  current: number;
}
