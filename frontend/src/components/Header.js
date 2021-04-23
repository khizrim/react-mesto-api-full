import logo from '../images/logo.svg';
import { Switch, Route, Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <div className={`header__content ${props.isLoggedIn ? 'header__content_burger' : ''}`}>
        <Link to="" className="header__link">
          <img src={logo} alt="Логотип" className="header__logo" />
        </Link>
        {props.isLoggedIn && (
          <button
            type="button"
            aria-label="Закрыть"
            className={`header__burger-btn ${
              props.isBurgerActive ? 'header__burger-btn_active' : ''
            }`}
            onClick={props.onBurgerClick}
          />
        )}
        <nav className="header__menu">
          <ul
            className={`header__menu-links ${props.isLoggedIn ? 'header__menu-links_burger' : ''} ${
              props.isBurgerActive ? 'header__menu-links_visible' : ''
            }`}
          >
            <Switch>
              <Route path="/sign-up">
                <li className="header__menu-item">
                  <Link to="/sign-in" className="header__menu-link">
                    Войти
                  </Link>
                </li>
              </Route>
              <Route path="/sign-in">
                <li className="header__menu-item">
                  <Link to="/sign-up" className="header__menu-link">
                    Регистрация
                  </Link>
                </li>
              </Route>
              {props.isLoggedIn ? (
                <>
                  <li className="header__user-email">{props.userEmail}</li>
                  <li
                    onClick={props.onSignOut}
                    className="header__menu-link header__menu-link_dimmed"
                  >
                    Выйти
                  </li>
                </>
              ) : (
                ''
              )}
            </Switch>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
