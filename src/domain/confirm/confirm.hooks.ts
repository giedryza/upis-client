import { useModalContext } from 'domain/modal';
import { ConfirmationModal } from 'components/modals';

export const useConfirm = () => {
  const { openModal } = useModalContext();

  const confirmation = async (
    prompt: string
  ): Promise<{ confirmed: boolean }> => {
    const { action } = await openModal({
      component: ConfirmationModal,
      props: { prompt },
    });

    if (action === 'CONFIRM') return { confirmed: true };

    return { confirmed: false };
  };

  return {
    confirmation,
  };
};
