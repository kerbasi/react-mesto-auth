import crossPath from "../images/cross.svg";
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({ card, onClose }) {
  const className = `popup popup_type_image ${card ? "popup_opened" : ""}`;
  usePopupClose(card, onClose);
  return (
    <div className={className}>
      <div className='popup__container popup__container_type_image'>
        <button type='reset' className='popup__cross'>
          <img
            src={crossPath}
            alt='иконка крестика'
            className='popup__cross-image'
            onClick={onClose}
          />
        </button>
        <img
          className='popup__image'
          src={card ? card.link : "#"}
          alt={card ? card.name : "увеличенное изображение"}
        />
        <h2 className='popup__title popup__title_type_image'>
          {card ? card.name : ""}
        </h2>
      </div>
    </div>
  );
}

export default ImagePopup;
