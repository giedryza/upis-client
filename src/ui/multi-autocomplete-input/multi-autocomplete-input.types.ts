export interface Item {
  label: string;
  value: string;
}

export interface Props {
  name: string;
  label: string;
  items: Item[];
  value: Item['value'][];
  onChange: (value: Item['value'][]) => void;
  placeholder?: string;
  error?: string;
}