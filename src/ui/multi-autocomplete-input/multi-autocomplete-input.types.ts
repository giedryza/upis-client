export interface Item {
  label: string;
  value: string;
}

export interface Props {
  name: string;
  label: string;
  items: Item[];
  value: Item['value'][];
  onChange: (item: Item[]) => void;
}
