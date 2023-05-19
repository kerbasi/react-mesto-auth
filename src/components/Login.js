function Login() {
  return (
    <main className='main page__main page__main_form'>
      <h1 className='main__title'>Вход</h1>
      <form className='main__form'>
        <input className='main__input' type='email' placeholder='Email'></input>
        <input
          className='main__input'
          type='password'
          placeholder='Пароль'
        ></input>
        <button className='main__button'>Войти</button>
      </form>
    </main>
  );
}

export default Login;
