import React from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';

import api from "../utils/api";
import auth from "../utils/auth";
import logo from '../images/header/logo.svg';

import Header from './Header'
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import Login from "./Login";
import Register from "./Register";

import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [infoTooltipConfirmStatus, setInfoTooltipConfirmStatus] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');

    const navigate = useNavigate();

    React.useEffect(() => {
        if (loggedIn) {
            api.get('/cards')
                .then((data) => {
                    setCards(data);
                })
                .catch((err) => console.log(err));
        }
    }, [loggedIn]);

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setIsInfoTooltipOpen(false);
        setSelectedCard({});
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        api.delete(`/cards/${card._id}`)
            .then(() => {
                    setCards((state) => state.filter((c) => c._id !== card._id));
                }
            )
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateUser(user) {
        api.patch('/users/me', user)
            .then((data) => {
                setCurrentUser(data);
            })
            .then(() => closeAllPopups())
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(data) {
        api.patch('/users/me/avatar', data)
            .then((data) => {
                setCurrentUser(data);
            })
            .then(() => closeAllPopups())
            .catch((err) => {
                console.error(err);
            })
    }

    function handleAddPlaceSubmit(newCard) {
        api.post('/cards', newCard)
            .then((card) => {
                setCards([card, ...cards]);
            })
            .then(() => closeAllPopups())
            .catch((err) => {
                console.error(err);
            })
    }

    function handleLogin(data) {
        auth.login(data)
            .then((res) => {
                console.log(res);
                console.log(res.token);
                setUserEmail(data.email);
                localStorage.setItem('jwt', res.token);
                setLoggedIn(true);
                navigate("/", {replace: true});
            })
            .catch((err) => {
                setInfoTooltipConfirmStatus(false);
                setIsInfoTooltipOpen(true);
                console.error(err);
            })
    }

    function handleRegister(data) {
        auth.register(data)
            .then(() => {
                setInfoTooltipConfirmStatus(true);
                navigate("/sign-in", {replace: true});
            })
            .catch((err) => {
                setInfoTooltipConfirmStatus(false);
                console.error(err);
            })
            .finally(() => {
                setIsInfoTooltipOpen(true);
            });
    }

    function handleTokenCheck() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.checkToken(jwt)
                .then((res) => {
                    setUserEmail(res.data.email);
                    setLoggedIn(true);
                    navigate('/', {replace: true});
                })
        }
    }

    function handleLogout() {
        setUserEmail('');
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        navigate('/sign-in', {replace: true});
    }

    React.useEffect(() => {
        if (loggedIn) {
            api.get('/users/me')
                .then((data) => {
                    setCurrentUser(data);
                })
                .catch((err) => console.log(err));
        }
    }, [loggedIn]);

    React.useEffect(() => {
        handleTokenCheck();
    }, []);

    return (

        <CurrentUserContext.Provider value={{currentUser, loggedIn, userEmail}}>
            <div className="App">
                <div className="root">
                    <div className="page">
                        <Header logo={logo} onLogout={handleLogout}/>
                        <Routes>
                            <Route
                                path="/"
                                element={(
                                    <ProtectedRoute
                                        element={Main}
                                        onEditProfile={handleEditProfileClick}
                                        onAddPlace={handleAddPlaceClick}
                                        onEditAvatar={handleEditAvatarClick}
                                        onCardClick={handleCardClick}
                                        onCardLike={handleCardLike}
                                        onCardDelete={handleCardDelete}
                                        loggedIn={loggedIn}
                                        cards={cards}
                                    />
                                )}
                            />
                            <Route
                                path="/sign-in"
                                element={<Login onLogin={handleLogin}/>}
                            />
                            <Route
                                path="/sign-up"
                                element={<Register onRegister={handleRegister}/>}
                            />
                            <Route
                                path="*"
                                element={loggedIn ? <Navigate to="/" replace/> : <Navigate to="/sign-in" replace/>}
                            />
                        </Routes>
                        <Footer/>
                        <InfoTooltip
                            isOpen={isInfoTooltipOpen}
                            confirmStatus={infoTooltipConfirmStatus}
                            onClose={closeAllPopups}
                        />
                        <EditProfilePopup
                            isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser}
                        />
                        <EditAvatarPopup
                            isOpen={isEditAvatarPopupOpen}
                            onClose={closeAllPopups}
                            onUpdateAvatar={handleUpdateAvatar}
                        />
                        <AddPlacePopup
                            isOpen={isAddPlacePopupOpen}
                            onClose={closeAllPopups}
                            onAddPlace={handleAddPlaceSubmit}
                        />
                        <PopupWithForm title="Вы уверены?" name="confirm" onClose={closeAllPopups} textButton="Да"/>
                        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
                    </div>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
