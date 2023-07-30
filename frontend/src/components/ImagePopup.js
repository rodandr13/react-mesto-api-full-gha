function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_type_image ${card.name ? 'popup_opened' : ''}`}>
            <figure className="popup__image-container">
                <img className="popup__image" src={card.link} alt={card.name}/>
                <figcaption className="popup__image-caption">{card.name}</figcaption>
                <button onClick={onClose}
                        type="button"
                        className="popup__close-button"
                        aria-label="Закрыть" />
            </figure>
        </div>
    )
}

export default ImagePopup;