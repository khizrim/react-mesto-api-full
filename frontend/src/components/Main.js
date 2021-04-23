import { useContext } from 'react';
import Card from '../components/Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  const cardsList = props.cards.map((card) => {
    return (
      <Card
        key={card._id}
        card={card}
        onCardClick={props.onCardClick}
        onCardLike={props.onCardLike}
        onCardDelete={props.onCardDelete}
      />
    );
  });

  return (
    <main className='main'>
      <section className='profile'>
        <div className='profile__info'>
          <div
            className='profile__user-pic'
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            onClick={props.onEditAvatar}
          ></div>
          <div className='profile__user-info'>
            <div className='profile__first-row'>
              <h1 className='profile__user-name'>{currentUser.name}</h1>
              <button
                type='button'
                className='profile__edit-btn'
                aria-label='Редактировать профиль'
                onClick={props.onEditProfile}
              />
            </div>
            <p className='profile__user-about'>{currentUser.about}</p>
          </div>
        </div>
        <button
          type='button'
          className='profile__add-btn'
          aria-label='Добавить карточку'
          onClick={props.onAddPlace}
        />
      </section>
      <section className='cards'>{cardsList}</section>
    </main>
  );
}

export default Main;
