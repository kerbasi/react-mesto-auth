import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ onCardClick, data, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(data);
  };

  const handleLikeClick = () => {
    onCardLike(data);
  };

  const handleDeleteClick = () => {
    onCardDelete(data);
  };

  const isOwn = data.owner._id === currentUser._id;
  const isLiked = data.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__heart-image ${
    isLiked && "element__heart-image_active"
  }`;

  const cardDeleteButtonClassName = `element__trash-image ${
    isOwn && "element__trash-image_visible"
  }`;

  return (
    <article className='element'>
      <img
        className='element__image'
        src={data.link}
        alt={data.name}
        onClick={handleCardClick}
      />
      <h2 className='element__title'>{data.name}</h2>
      <div className='element__heart-wrapper'>
        <button
          className={cardLikeButtonClassName}
          type='button'
          onClick={handleLikeClick}
        ></button>
        <p className='element__heart-counter'>{data.likes.length}</p>
      </div>
      {isOwn && (
        <button
          className={cardDeleteButtonClassName}
          type='button'
          onClick={handleDeleteClick}
        ></button>
      )}
    </article>
  );
}

export default Card;
