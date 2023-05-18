import PopupWithForm from "./PopupWithForm";
import { useState, useRef, useEffect } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [buttonText, setButtonText] = useState("Сохранить");
  function handleSubmit(e) {
    e.preventDefault();
    setButtonText("Сохранение...");
    onUpdateAvatar(
      {
        avatar: inputRef.current.value,
      },
      () => {
        setButtonText("Сохранить");
      }
    );
  }

  useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  const inputRef = useRef();

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='avatar'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isValid={true}
    >
      <input
        ref={inputRef}
        type='url'
        id='avatar-data-input'
        className='popup__input popup__input_type_data'
        name='data'
        placeholder='Ссылка на картинку'
        required
      />
      <span className='avatar-data-input-error popup__error'></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
