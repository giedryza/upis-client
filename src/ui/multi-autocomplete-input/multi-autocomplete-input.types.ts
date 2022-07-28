export interface Item {
  label: string;
  value: string;
}

export interface Props {
  label: string;
  items: Item[];
  value: Item[];
  onChange: (item: Item[]) => void;
}
