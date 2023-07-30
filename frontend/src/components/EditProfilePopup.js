import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({onClose, isOpen, onUpdateUser}) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const {currentUser} = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        if (currentUser.name && currentUser.about) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm title="Редактировать профиль"
                       name="edit-profile"
                       isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       textButton="Сохранить">
            <input type="text"
                   onChange={handleChangeName}
                   value={name}
                   id="profile-name"
                   className="form__input form__input_type_name"
                   name="name"
                   placeholder="Имя"
                   minLength="2"
                   maxLength="40"
                   required
            />
            <span className="form__input-error profile-name-error"></span>
            <input
                onChange={handleChangeDescription}
                value={description}
                type="text"
                id="profile-job"
                className="form__input form__input_type_job"
                name="about"
                placeholder="Деятельность"
                minLength="2"
                maxLength="200"
                required
            />
            <span className="form__input-error profile-job-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;