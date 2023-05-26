import { Link, useLocation } from "react-router-dom";
import logoPath from "../images/logo.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header({ handleSignout }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const handleClick = () => {
    handleSignout();
  };
  return (
    <header className='header page__header'>
      <Link to='/'>
        <img src={logoPath} alt='лого место' className='header__logo' />
      </Link>
      <nav className='header__nav'>
        {currentUser ? (
          <>
            <p className='header__email'>{currentUser.email}</p>
            <Link
              to='/sign-in'
              className='header__link header__link_type_exit'
              onClick={handleClick}
            >
              Выйти
            </Link>
          </>
        ) : location.pathname === "/sign-up" ? (
          <Link to='/sign-in' className='header__link'>
            Войти
          </Link>
        ) : (
          <Link to='/sign-up' className='header__link'>
            Зарегистрироваться
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
