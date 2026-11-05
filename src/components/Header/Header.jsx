import s from './Header.module.css';
import avatar from '../Icons/avatar.svg';
import logo from '../Icons/logo.svg';
import menu from '../Icons/menu.svg';
import { useState } from 'react';
export function Header({ handleToggle, userData }) {
  const [isShown, setIsShown] = useState(false);
  const handleShow = () => {
    setIsShown(prev => !prev);
  };
  return (
    <header className={s.header}>
      <div className={s.container}>
        <img src={logo} alt="logo" className={s.logo} />
        <ul className={s.list}>
          <li className={s.item}>
            <a href="#" className={s.nav}>
              Who we are
            </a>
          </li>
          <li className={s.item}>
            <a href="#" className={s.nav}>
              Contacts
            </a>
          </li>
          <li className={s.item}>
            <a href="#" className={s.nav} onClick={handleShow}>
              Menu
            </a>
          </li>
        </ul>
        {userData ? (
          <div className={s.userData}>
            <p className={s.userName}>{userData.userName}</p>
            <img src={avatar} alt="avatar" />
          </div>
        ) : (
          <div className={s.userData}>
            <button className={s.btn} onClick={() => handleToggle('signUp')}>
              Sign Up
            </button>
            <button className={s.btn} onClick={() => handleToggle('login')}>
              Login
            </button>
          </div>
        )}
        <div className={s.wrapper} onClick={handleShow}>
          <p className={s.menu}>Menu</p>
          <img src={menu} alt="arrow" className={s.arrow} />
        </div>
      </div>
      {isShown && (
        <div className={s.menuOverlay}>
          <div className={s.containerMenu}>
            <div className={s.menuWrapper}>
              <ul className={s.Menulist}>
                <li className={s.item}>
                  <a href="#" className={s.nav}>
                    Who we are
                  </a>
                </li>
                <li className={s.item}>
                  <a href="#" className={s.nav}>
                    Contacts
                  </a>
                </li>
                <li className={s.item}>
                  <a href="#" className={s.nav}>
                    Menu
                  </a>
                </li>
              </ul>
              {userData ? (
                <div className={s.userDataMenu}>
                  <p className={s.userName}>{userData.userName}</p>
                  <img src={avatar} alt="avatar" />
                </div>
              ) : (
                <div className={s.userDataMenu}>
                  <button
                    className={s.btn}
                    onClick={() => handleToggle('signUp')}
                  >
                    Sign Up
                  </button>
                  <button
                    className={s.btn}
                    onClick={() => handleToggle('login')}
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
