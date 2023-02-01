import { ModalProps } from 'domain/modal';

export interface Props extends ModalProps {
  prompt: string;
  closeModal: (param?: { action: 'CLOSE' } | { action: 'CONFIRM' }) => void;
}
