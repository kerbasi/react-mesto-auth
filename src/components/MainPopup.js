import crossPath from "../images/cross.svg";
import failPath from "../images/fail.png";
import successPath from "../images/success.png";

import { usePopupClose } from "../hooks/usePopupClose";

function MainPopup({ isSuccess, isOpen, onClose }) {
  console.log(isOpen);
  const popupClassName = isOpen ? `popup popup_opened` : `popup`;

  usePopupClose(isOpen, onClose);

  const image = isSuccess ? successPath : failPath;
  const altText = isSuccess ? "изобразение галки" : "изображение крестика";
  const text = isSuccess
    ? `Вы успешно зарегистрировались!`
    : `Что-то пошло не так!
  Попробуйте ещё раз.`;

  return (
    <div className={popupClassName}>
      <div className='popup__container'>
        <button type='reset' className='popup__cross' onClick={onClose}>
          <img
            src={crossPath}
            alt='иконка крестика'
            className='popup__cross-image'
          />
        </button>
        <img src={image} alt={altText} className='popup__main-image' />
        <h2 className='popup__title popup__title_type_main'>{text}</h2>
      </div>
    </div>
  );
}

export default MainPopup;
