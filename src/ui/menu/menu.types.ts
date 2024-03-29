import { IconName } from 'ui/icon';

export interface Item {
  id: string;
  label: string;
  icon?: IconName;
  onClick?: () => void;
  disabled?: boolean;
}

interface Section {
  id: string;
  items: Item[];
  label?: string;
  ariaLabel?: string;
}

export interface Props {
  sections: Section[];
  label?: string;
  ariaLabel?: string;
  icon?: IconName;
  size?: 'sm' | 'md';
}
