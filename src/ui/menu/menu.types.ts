interface Item {
  id: string;
  label: string;
  onClick?: () => void;
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
}
