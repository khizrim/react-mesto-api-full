import { useContext, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import useForm from '../hooks/useForm';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const {
    handleChange,
    validateForm,
    setValues,
    reset,
    values,
    errors,
    formValidity,
  } = useForm();

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(values, reset);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      submitBtn={props.submitBtn || 'Сохранить'}
      isOpen={props.isOpen}
      isValid={formValidity}
      onChange={validateForm}
      onSubmit={handleSubmit}
      onClose={props.onClose}
    >
      <input
        id="user-name"
        type="text"
        name="name"
        value={values.name || ''}
        onChange={handleChange}
        placeholder="Ваше имя"
        autoComplete="name"
        className={`form__input ${errors.name ? 'form__input_type_error' : ''}`}
        minLength="2"
        maxLength="40"
        required
      />
      {errors.name && <span className="form__input-error">{errors.name}</span>}
      <input
        id="user-about"
        type="text"
        name="about"
        value={values.about || ''}
        onChange={handleChange}
        placeholder="Чем вы занимаетесь?"
        autoComplete="off"
        className={`form__input ${
          errors.about ? 'form__input_type_error' : ''
        }`}
        minLength="2"
        maxLength="200"
        required
      />
      {errors.about && (
        <span className="form__input-error">{errors.about}</span>
      )}
    </PopupWithForm>
  );
}

export default EditProfilePopup;
