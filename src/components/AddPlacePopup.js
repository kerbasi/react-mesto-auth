import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  const [buttonText, setButtonText] = useState("Сохранить");

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText("Сохранение...");
    onAddPlace(
      {
        name: values.title,
        link: values.data,
      },
      () => {
        setButtonText("Сохранить");
      }
    );
  }

  useEffect(() => {
    setValues({ title: "", data: "" });
  }, [isOpen]);

  return (
    <PopupWithForm
      title='Новое место'
      name='add-image'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type='text'
        id='add-title-input'
        className='popup__input popup__input_type_title'
        name='title'
        placeholder='Название'
        minLength='2'
        maxLength='30'
        required
        onChange={handleChange}
        value={values.title ?? ""}
      />
      <span className='add-title-input-error popup__error'>{errors.title}</span>
      <input
        type='url'
        id='add-data-input'
        className='popup__input popup__input_type_data'
        name='data'
        placeholder='Ссылка на картинку'
        required
        onChange={handleChange}
        value={values.data ?? ""}
      />
      <span className='add-data-input-error popup__error'>{errors.data}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
