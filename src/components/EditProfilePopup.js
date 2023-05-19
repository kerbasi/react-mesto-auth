import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  const currentUser = useContext(CurrentUserContext);
  const [buttonText, setButtonText] = useState("Сохранить");

  useEffect(() => {
    setValues({ title: currentUser.name, data: currentUser.about });
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText("Сохранение...");
    onUpdateUser(
      {
        name: values.title,
        about: values.data,
      },
      () => {
        setButtonText("Сохранить");
      }
    );
  };

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='person'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type='text'
        id='person-title-input'
        className='popup__input popup__input_type_title'
        name='title'
        minLength='2'
        maxLength='40'
        required
        value={values.title ?? ""}
        onChange={handleChange}
      />
      <span className='person-title-input-error popup__error'>
        {errors.title}
      </span>
      <input
        type='text'
        id='person-data-input'
        className='popup__input popup__input_type_data'
        name='data'
        minLength='2'
        maxLength='200'
        required
        value={values.data ?? ""}
        onChange={handleChange}
      />
      <span className='person-data-input-error popup__error'>
        {errors.data}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
