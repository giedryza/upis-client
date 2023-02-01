export type PromiseResolvePayload<Action extends string> = {
  action: Action;
};

export interface ModalProps {
  closeModal: (param?: PromiseResolvePayload<'CLOSE'>) => void;
}
