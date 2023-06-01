import { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function Login({ handleLogin }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.email && values.password) {
      handleLogin(values.email, values.password);
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
      <h1 className='main__title'>Вход</h1>
      <form
        className='main__form'
        onSubmit={handleSubmit}
        name='login'
        noValidate
      >
        <input
          name='email'
          id='email-input'
          className='main__input'
          type='email'
          placeholder='Email'
          value={values.email || ""}
          onChange={handleChange}
        ></input>
        <span className='popup__error'>{errors.email}</span>
        <input
          name='password'
          id='password-input'
          className='main__input'
          type='password'
          placeholder='Пароль'
          value={values.password || ""}
          onChange={handleChange}
          minLength='2'
        ></input>
        <span className='popup__error'>{errors.password}</span>
        <button type='submit' className={buttonClassName} disabled={!isValid}>
          Войти
        </button>
      </form>
    </main>
  );
}

export default Login;
