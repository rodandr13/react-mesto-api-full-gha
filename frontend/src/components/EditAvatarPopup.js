import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm title="Обновить аватар"
                       name="avatar"
                       isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       textButton="Сохранить">
            <input
                ref={avatarRef}
                type="url"
                id="avatar-link"
                className="form__input form__input_type_avatar-link"
                name="avatar"
                placeholder="Ссылка на картинку"
                required
            />
            <span className="form__input-error avatar-link-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;