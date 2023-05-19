function Register() {
  return (
    <main className='main page__main page__main_form'>
      <h1 className='main__title'>Регистрация</h1>
      <form className='main__form'>
        <input className='main__input' type='email' placeholder='Email'></input>
        <input
          className='main__input'
          type='password'
          placeholder='Пароль'
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
