import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import SuccessPopup from "./SuccessPopup";
import FailPopup from "./FailPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isFailPopupOpen, setIsFailPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      auth.tokenCheck(localStorage.getItem("token")).then((res) => {
        setIsLoggedIn(true);
        api
          .getUserInfo()
          .then((data) => {
            setCurrentUser({ ...data, email: res.data.email });
          })
          .catch((err) => console.log(err));
        api
          .getInitialCards()
          .then((data) => {
            setCards(data);
          })
          .catch((err) => console.log(err));
      });
    }
  }, [isLoggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleDeleteCardClick = (card) => {
    setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen);
    setDeletedCard(card);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setIsFailPopupOpen(false);
    setSelectedCard(null);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card, setButtonText) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prev) => prev.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setButtonText();
      });
  };

  const handleUpdateUser = ({ name, about }, setButtonText) => {
    api
      .setUserInfo({ title: name, data: about })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setButtonText();
      });
  };

  const handleUpdateAvatar = ({ avatar }, setButtonText) => {
    api
      .editAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setButtonText();
      });
  };

  const handleAddPlaceSubmit = ({ name, link }, setButtonText) => {
    api
      .setCard({ name, link })
      .then((newCard) => {
        setCards((prev) => [newCard, ...prev]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setButtonText();
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute
              currentUser={currentUser}
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onClose={closeAllPopups}
              onCardLike={handleCardLike}
              cards={cards}
              onCardDelete={handleDeleteCardClick}
              isLoggedIn={isLoggedIn}
            ></ProtectedRoute>
          }
        />
        <Route
          path='/sign-up'
          element={
            <Register
              setIsFailPopupOpen={setIsFailPopupOpen}
              setIsSuccessPopupOpen={setIsSuccessPopupOpen}
            />
          }
        />
        <Route
          path='/sign-in'
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setIsFailPopupOpen={setIsFailPopupOpen}
            />
          }
        />
      </Routes>
      <Footer />

      {currentUser && (
        <>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            deletedCard={deletedCard}
          />
        </>
      )}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <SuccessPopup isOpen={isSuccessPopupOpen} onClose={closeAllPopups} />
      <FailPopup isOpen={isFailPopupOpen} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
