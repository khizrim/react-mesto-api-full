import useEscCloser from '../hooks/useEscCloser';
import useOverlayCloser from '../hooks/useOverlayCloser';

function ImagePopup(props) {
  useEscCloser(props);
  const handleOverlayClose = useOverlayCloser(props)

  return (
    <div
      className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : '' }`}
      onClick={handleOverlayClose}
    >
      <div className='popup__preview-container'>
        <button
          type='reset'
          aria-label='Закрыть'
          className='popup__close-btn'
          onClick={props.onClose}
        />
        <img
          className='popup__image'
          src={props.card ? props.card.link : '#'}
          alt={props.card.name}
        />
        <p className='popup__image-caption'>{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
