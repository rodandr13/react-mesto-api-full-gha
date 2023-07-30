import success from "../images/popup/success.svg";
import unsuccess from "../images/popup/unsuccess.svg";

function InfoTooltip({isOpen, onClose, confirmStatus}) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <img className="popup__image popup__image_type_status" src={confirmStatus ? success : unsuccess} alt=""/>
                <h2 className="popup__header popup__header_type_confirm-status">
                    {confirmStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
                <button onClick={onClose}
                        type="button"
                        className="popup__close-button"
                        aria-label="Закрыть"/>
            </div>
        </div>
    )
}

export default InfoTooltip;