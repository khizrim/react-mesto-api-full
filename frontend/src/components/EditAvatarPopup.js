import useForm from '../hooks/useForm';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const {
    handleChange,
    validateForm,
    reset,
    values,
    errors,
    formValidity,
  } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(values, reset);
  }

  return (
    <PopupWithForm
      name="user-pic-edit"
      title="Обновить аватар"
      submitBtn={props.submitBtn || 'Обновить'}
      isOpen={props.isOpen}
      isValid={formValidity}
      onChange={validateForm}
      onSubmit={handleSubmit}
      onClose={props.onClose}
    >
      <input
        id="user-pic-url"
        type="url"
        name="link"
        value={values.link || ''}
        onChange={handleChange}
        placeholder="Ссылка на аватарку"
        className={`form__input ${errors.link ? 'form__input_type_error' : ''}`}
        required
      />
      {errors.link && <span className="form__input-error">{errors.link}</span>}
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
