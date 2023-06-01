import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function Register({ handleRegister }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.email && values.password) {
      handleRegister(values.email, values.password);
    }
  };

  useEffect(() => {
    setValues({ email: "", password: "" });
  }, []);

  const buttonClassName = `main__button ${
    !isValid ? "main__button_disabled" : ""
  }`;

  return (
    <main className='main page__main page__main_form'>
      <h1 className='main__title'>Регистрация</h1>
      <form className='main__form' onSubmit={handleSubmit} name='register'>
        <input
          name='email'
          className='main__input'
          type='email'
          placeholder='Email'
          value={values.email || ""}
          onChange={handleChange}
        ></input>
        <span className='popup__error'>{errors.email}</span>
        <input
          name='password'
          className='main__input'
          type='password'
          placeholder='Пароль'
          value={values.password || ""}
          onChange={handleChange}
          minLength='2'
        ></input>
        <span className='popup__error'>{errors.password}</span>
        <button type='submit' className={buttonClassName} disabled={!isValid}>
          Зарегистрироваться
        </button>
        <Link className='main__link' to='/sign-in'>
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </main>
  );
}

export default Register;
