import { useEffect } from 'react';

function useOverlayCloser(props) {
  const { isOpen, onClose } = props;

  useEffect(() => {
    if (!isOpen) return;

    function handleOverlayClose (e) {
      if (e.target.classList.contains('popup_opened')) {
        onClose();
      }
    };

    document.addEventListener('click', handleOverlayClose);

    return () => {
      document.removeEventListener('click', handleOverlayClose);
    };
  }, [isOpen, onClose]);
}

export default useOverlayCloser;
