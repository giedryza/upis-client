import { useModalContext } from 'domain/modal';
import { ConfirmationModal } from 'components/modals';

export const useConfirm = () => {
  const { openModal } = useModalContext();

  const confirmation = async (
    prompt: string,
    title?: string
  ): Promise<{ confirmed: boolean }> => {
    const { action } = await openModal({
      component: ConfirmationModal,
      props: { prompt, title },
    });

    if (action === 'CONFIRM') return { confirmed: true };

    return { confirmed: false };
  };

  return {
    confirmation,
  };
};
