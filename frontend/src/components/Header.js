import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Header({ logo, onLogout }) {
    const { userEmail } = React.useContext(CurrentUserContext);
    const location = useLocation();

    return (
        <header className="header">
            <img src={logo} alt="Логотип" className="header__logo"/>
            {location.pathname === '/sign-in' && (
                <Link className="header__link" to="/sign-up">Регистрация</Link>
            )}
            {location.pathname === '/sign-up' && (
                <Link className="header__link" to="/sign-in">Войти</Link>
            )}
            {location.pathname === '/' && (
                <div className="header__info">
                    <p className="header__email">{userEmail}</p>
                    <Link className="header__link" to="/sign-in" onClick={onLogout}>Выйти</Link>
                </div>
            )}
        </header>
    );
}

export default Header;
