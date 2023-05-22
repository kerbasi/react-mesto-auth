﻿import { useState } from "react";
import * as auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [values, setValues] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.email && values.password) {
      const { email, password } = values;
      auth.register(email, password).then((res) => {
        if (res) {
          navigate("/sign-in", { replace: true });
        }
      });
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
        <a className='main__link' href='/sign-in'>
          Уже зарегистрированы? Войти
        </a>
      </form>
    </main>
  );
}

export default Register;
