import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }
    React.useEffect(() => {
        if (isOpen) {
            setName('');
            setLink('');
        }
    }, [isOpen])
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link
        });
    }

    return (
        <PopupWithForm title="Новое место"
                       name="add-place"
                       isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       textButton="Создать">
            <input
                type="text"
                id="image-name"
                className="form__input form__input_type_image-name"
                name="name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                value={name}
                onChange={handleChangeName}
                required
            />
            <span className="form__input-error image-name-error"></span>
            <input
                type="url"
                id="image-link"
                className="form__input form__input_type_image-link"
                name="link"
                placeholder="Ссылка на картинку"
                value={link}
                onChange={handleChangeLink}
                required
            />
            <span className="form__input-error image-link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;