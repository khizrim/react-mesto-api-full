import useEscCloser from '../hooks/useEscCloser';
import useOverlayCloser from '../hooks/useOverlayCloser';

function PopupWithForm(props) {
  const { isOpen, onClose } = props;
  useEscCloser(isOpen, onClose);
  const handleOverlayClose = useOverlayCloser(props)

  return (
    <div
      className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : '' }`}
      onClick={handleOverlayClose}
    >
      <div className='popup__container'>
        <form
          action='#'
          method='POST'
          name={`${props.name}-form`}
          className={`popup_form_type_${props.name}`}
          onChange={props.onChange}
          onSubmit={props.onSubmit}
          noValidate
        >
          <button
            type='reset'
            aria-label='Закрыть'
            className='popup__close-btn'
            onClick={props.onClose}
          />
          <h3 className='popup__title'>{props.title}</h3>
          {props.children}
          <button disabled={!props.isValid} type='submit' className={`form__submit-btn ${!props.isValid ? 'form__submit-btn_disabled' : ''}`}>
            {props.submitBtn}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
