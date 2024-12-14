import { useState } from 'react';
import LoginModal from '@/modules/auth/components/LoginModal';

export default function useLoginModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const render = () => {
    return <LoginModal isVisible={isOpen} onClose={handleCloseModal} />;
  };

  return {
    onOpenModal: handleOpenModal,
    render,
  };
}
