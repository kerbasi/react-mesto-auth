import { useState } from "react";

function Login({ handleLogin }) {
  const [values, setValues] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.email && values.password) {
      handleLogin(values.email, values.password);
    }
  };

  return (
    <main className='main page__main page__main_form'>
      <h1 className='main__title'>Вход</h1>
      <form className='main__form' onSubmit={handleSubmit} name='login'>
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
        <button className='main__button'>Войти</button>
      </form>
    </main>
  );
}

export default Login;
