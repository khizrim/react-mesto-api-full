import useForm from '../hooks/useForm';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
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
    props.onAddPlace(values, reset);
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      submitBtn={props.submitBtn || 'Создать'}
      isOpen={props.isOpen}
      isValid={formValidity}
      onChange={validateForm}
      onSubmit={handleSubmit}
      onClose={props.onClose}
    >
      <input
        id="card-title"
        type="text"
        name="name"
        placeholder="Название"
        value={values.name || ''}
        onChange={handleChange}
        className={`form__input ${errors.name ? 'form__input_type_error' : ''}`}
        minLength="2"
        maxLength="30"
        required
      />
      {errors.name && <span className="form__input-error">{errors.name}</span>}
      <input
        id="card-url"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        value={values.link || ''}
        onChange={handleChange}
        className={`form__input ${errors.link ? 'form__input_type_error' : ''}`}
        required
      />
      {errors.link && <span className="form__input-error">{errors.link}</span>}
    </PopupWithForm>
  );
}

export default AddPlacePopup;
