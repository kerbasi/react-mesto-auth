import { Link } from "react-router-dom";
import logoPath from "../images/logo.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header({ handleSignout }) {
  const currentUser = useContext(CurrentUserContext);
  const handleClick = () => {
    handleSignout();
  };
  return (
    <header className='header page__header'>
      <img src={logoPath} alt='лого место' className='header__logo' />
      <nav className='header__nav'>
        {currentUser ? (
          <>
            <Link to='#' className='header__link'>
              {currentUser.email}
            </Link>
            <Link to='sign-in' className='header__link' onClick={handleClick}>
              Выйти
            </Link>
          </>
        ) : (
          <Link to='/sign-in' className='header__link'>
            Войти
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
