function PopupWithForm({title, isOpen, name, onClose, textButton, children, onSubmit}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h2 className="popup__header">{title}</h2>
                <form onSubmit={onSubmit} action="#" method="post" name={`${name}-form`}
                      className={`form popup__form popup__form_type_${name}`}>
                    {children}
                    <button type="submit" className="form__button">{textButton}</button>
                </form>
                <button onClick={onClose}
                        type="button"
                        className="popup__close-button"
                        aria-label="Закрыть" />
            </div>
        </div>
    )
}

export default PopupWithForm;