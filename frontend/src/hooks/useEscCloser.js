import { useEffect } from 'react';

function useEscCloser(props) {
  const { isOpen, onClose } = props;
  useEffect(() => {
    if (!isOpen) return;

    function handleEscClose (e) {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpen, onClose]);
}

export default useEscCloser;
