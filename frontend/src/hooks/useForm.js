import { useState } from 'react';

function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [formValidity, setFormValidity] = useState(false);

  function handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const error = target.validationMessage;

    setValues({
      ...values,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: error,
    });
  }

  function validateForm(e) {
    const form = e.target.form;
    setFormValidity(form.checkValidity());
  }

  function reset() {
    setValues({});
    setErrors({});
    setFormValidity({});
  }

  return {
    handleChange,
    validateForm,
    setValues,
    setFormValidity,
    reset,
    values,
    errors,
    formValidity
  }
}

export default useForm;
