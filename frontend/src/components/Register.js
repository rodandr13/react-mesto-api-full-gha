import {Link} from "react-router-dom";
import React from "react";

function Register({onRegister}) {
    const [formValue, setFormValue] = React.useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(formValue);
    }

    return (
        <section className="authorization">
            <h2 className="authorization__header">Регистрация</h2>
            <form onSubmit={handleSubmit} className="form authorization__form">
                <input
                    value={formValue.email}
                    onChange={handleChange}
                    type="email"
                    id="email"
                    className="form__input authorization__input"
                    name="email"
                    placeholder="Email"
                    minLength="2"
                    maxLength="30"
                    required
                />
                <input
                    value={formValue.password}
                    onChange={handleChange}
                    type="password"
                    id="password"
                    className="form__input authorization__input"
                    name="password"
                    placeholder="Пароль"
                    minLength="2"
                    maxLength="30"
                    required
                />
                <button
                    type="submit"
                    className="form__button authorization__button"
                >Зарегистрироваться
                </button>
                <Link to="/sign-in" className="authorization__hint-text">
                    Уже зарегистрированы? Войти
                </Link>
            </form>
        </section>
    )
}

export default Register;