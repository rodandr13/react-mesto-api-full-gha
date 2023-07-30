import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const {currentUser} = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__button element__button_type_like ${isLiked && 'element__button_like-active'}`
    );

    function handleClick(e) {
        e.preventDefault();
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="element">
            <a onClick={handleClick} className="element__link-full-image" href="#">
                <img src={card.link} alt={card.name} className="element__image"/>
            </a>
            <div className="element__container">
                <h2 className="element__header">{card.name}</h2>
                <div className="element__like-container">
                    <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName}
                            aria-label="Нравится"></button>
                    <p className="element__count-likes">{card.likes.length}</p>
                </div>
            </div>
            {isOwn && <button onClick={handleDeleteClick} type="button"
                              className="element__button element__button_type_remove"
                              aria-label="Удалить"></button>}
        </li>
    )
}

export default Card;