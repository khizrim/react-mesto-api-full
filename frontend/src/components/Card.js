import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-btn ${
    isOwn ? 'card__delete-btn_visible' : ''
  }`;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-icon ${
    isLiked ? 'card__like-icon_active' : ''
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className='card'>
      <button
        type='button'
        aria-label='Удалить'
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <img
        className='card__image'
        src={props.card.link}
        alt='#'
        onClick={handleClick}
      />
      <div className='card__body'>
        <h2 className='card__title'>{props.card.name}</h2>
        <div className='card__like-btn'>
          <button
            type='button'
            aria-label='Лайк'
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className='card__like-counter'>{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
