import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import api from '../utils/api';
import * as auth from '../utils/auth';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmationPopup from './ConfirmationPopup';
import InfoTooltip from './InfoTooltip';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isImageViewerPopupOpen, setImageViewerPopupState] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupState] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const [isRegisteredSuccessefully, setIsRegisteredSuccessefully] = useState(
    false
  );
  const [loginError, setLoginError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [buttonState, setButtonState] = useState('');

  const noScroll =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isConfirmationPopupOpen;

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        try {
          const userData = await api.getUserData();
          setCurrentUser(userData);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        try {
          const initialCards = await api.getInitialCards();
          setCards(initialCards.reverse());
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    (async () => {
      try {
        setIsChecking(true);
        const userToken = localStorage.getItem('token');
        if (userToken) {
          const res = await auth.checkToken(userToken);
          if (res) {
            setIsLoggedIn(true);
            setUserEmail(res.email);
            history.push('/');
          }
        }
      } catch (err) {
        setIsLoggedIn(false);
        history.push('/signin');
      } finally {
        setIsChecking(false);
      }
    })();
  }, [history]);

  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupState(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupState(true);
  }

  function handleDeleteClick(e) {
    setConfirmationPopupState(true);
    setSelectedCard(e);
  }

  function handleCardClick(e) {
    setImageViewerPopupState(true);
    setSelectedCard(e);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    (async () => {
      try {
        const likedCard = await api.changeCardLikeStatus(card._id, isLiked);
        const newCards = cards.map((c) =>
          c._id === card._id ? likedCard.card : c
        );
        setCards(newCards);
      } catch (err) {
        console.log(err);
      }
    })();
  }

  function handleCardDelete(card) {
    (async () => {
      try {
        handleLoading(true, '????????????????...');
        await api.removeCard(card._id);
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
        closeAllPopups();
      } catch (err) {
        console.log(err);
      } finally {
        handleLoading(false);
      }
    })();
  }

  function handleUpdateAvatar(data, reset) {
    (async () => {
      try {
        handleLoading(true, '????????????????????...');
        const userData = await api.editUserPic(data);
        setCurrentUser(userData);
        closeAllPopups();
        reset();
      } catch (err) {
        console.log(err);
      } finally {
        handleLoading(false);
      }
    })();
  }

  function handleUpdateUser(data) {
    (async () => {
      try {
        handleLoading(true, '????????????????????...');
        const userData = await api.editUserData(data);
        setCurrentUser(userData);
        closeAllPopups();
      } catch (err) {
        console.log(err);
      } finally {
        handleLoading(false);
      }
    })();
  }

  function handleAddPlace(data, reset) {
    (async () => {
      try {
        handleLoading(true, '????????????????...');
        const newCard = await api.addCard(data);
        setCards([newCard, ...cards]);
        closeAllPopups();
        reset();
      } catch (err) {
        console.log(err);
      } finally {
        handleLoading(false);
      }
    })();
  }

  function handleLoading(isLoading, text) {
    if (isLoading) {
      setButtonState(text);
    } else {
      setButtonState('');
    }
  }

  function handleRegister(password, email) {
    handleLoading(true, '??????????????????????...');
    auth
      .register(password, email)
      .then((res) => {
        if (res) {
          history.push('/signin');
          setIsInfoTooltipOpen(true);
          setIsRegisteredSuccessefully(true);
        } else {
          setIsInfoTooltipOpen(true);
          setIsRegisteredSuccessefully(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        handleLoading(false);
      });
  }

  function handleLogin(password, email) {
    handleLoading(true, '????????...');
    auth
      .login(password, email)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setUserEmail(email);
        setIsLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        setLoginError(true);
        console.log(err);
      })
      .finally(() => {
        handleLoading(false);
      });
  }

  function handleSignOut(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    setIsBurgerActive(false);
    setIsLoggedIn(false);
    history.push('/signin');
  }

  function closeAllPopups() {
    setEditAvatarPopupState(false);
    setEditProfilePopupState(false);
    setAddPlacePopupState(false);
    setConfirmationPopupState(false);
    setImageViewerPopupState(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleBurgerClick() {
    setIsBurgerActive(!isBurgerActive);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={`page ${noScroll ? 'page_no-scroll' : ''}`}>
        <div className="page__container">
          <Header
            userEmail={userEmail}
            isLoggedIn={isLoggedIn}
            isBurgerActive={isBurgerActive}
            onBurgerClick={handleBurgerClick}
            onSignOut={handleSignOut}
          />
          <Switch>
            <Route path="/signup">
              <Register
                onSubmit={handleRegister}
                submitBtn={buttonState || '????????????????????????????????????'}
              />
            </Route>
            <Route path="/signin">
              <Login
                onSubmit={handleLogin}
                loginError={loginError}
                setLoginError={setLoginError}
                submitBtn={buttonState || '??????????'}
              />
            </Route>
            <ProtectedRoute
              path="/"
              isLoggedIn={isLoggedIn}
              isChecking={isChecking}
              component={Main}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
            />
          </Switch>
          <Footer />
          <InfoTooltip
            status={isRegisteredSuccessefully}
            successMessage={'???? ?????????????? ????????????????????????????????????!'}
            failMessage={'??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????.'}
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            submitBtn={buttonState}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            submitBtn={buttonState}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            submitBtn={buttonState}
            onAddPlace={handleAddPlace}
            onClose={closeAllPopups}
          />
          <ImagePopup
            isOpen={isImageViewerPopupOpen}
            name="image-vwr"
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <ConfirmationPopup
            isOpen={isConfirmationPopupOpen}
            card={selectedCard}
            submitBtn={buttonState}
            onCardDelete={handleCardDelete}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
