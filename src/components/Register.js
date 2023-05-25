import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [values, setValues] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.email && values.password) {
      handleRegister(values.email, values.password);
    }
  };

  return (
    <main className='main page__main page__main_form'>
      <h1 className='main__title'>Регистрация</h1>
      <form className='main__form' onSubmit={handleSubmit} name='register'>
        <input
          name='email'
          className='main__input'
          type='email'
          placeholder='Email'
          value={values.email}
          onChange={handleChange}
        ></input>
        <input
          name='password'
          className='main__input'
          type='password'
          placeholder='Пароль'
          value={values.password}
          onChange={handleChange}
        ></input>
        <button className='main__button'>Зарегистрироваться</button>
        <Link className='main__link' to='/sign-in'>
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </main>
  );
}

export default Register;
