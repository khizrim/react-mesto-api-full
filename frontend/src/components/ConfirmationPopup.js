import PopupWithForm from './PopupWithForm';

function ConfirmationPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.card);
  }

  return (
    <PopupWithForm
      name='confirmation-form'
      title='Вы уверены?'
      submitBtn={props.submitBtn || 'Да'}
      isOpen={props.isOpen}
      isValid={true}
      onSubmit={handleSubmit}
      onClose={props.onClose}
    />
  );
}

export default ConfirmationPopup;
