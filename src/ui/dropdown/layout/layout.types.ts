export type Labels = {
  [K in 'submit' | 'cancel' | 'close']: string;
};

export interface Props {
  id: string;
  title?: string;
  labels: Labels;
  onSubmit: () => void;
  onClose: () => void;
  onCancel: () => void;
}
