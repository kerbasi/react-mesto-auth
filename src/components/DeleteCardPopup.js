import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

function DeleteCardPopup({ isOpen, onClose, onCardDelete, deletedCard }) {
  const [buttonText, setButtonText] = useState("Да");
  function handleSubmit(e) {
    e.preventDefault();
    setButtonText("Удаление...");
    onCardDelete(deletedCard, () => {
      setButtonText("Да");
    });
  }
  return (
    <PopupWithForm
      title='Вы уверены?'
      name='delete-image'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isValid={true}
    />
  );
}

export default DeleteCardPopup;
