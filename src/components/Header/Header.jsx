import s from './Header.module.css';
import avatar from '../Icons/avatar.svg';
import logo from '../Icons/logo.svg';
import menu from '../Icons/menu.svg';
import { useState } from 'react';
import { HeaderMobile } from './HeaderMobile';
export function Header({ handleToggle, userData }) {
  const [isShown, setIsShown] = useState(false);
  const handleShow = () => {
    setIsShown(prev => !prev);
  };
  const handleClose = () => {
    setIsShown(false);
    
  }
  return (
    <header className={s.header}>
      <div className={s.container}>
        <a href="/TeamProject_Duo">
          <img src={logo} alt="logo" className={s.logo} />
        </a>

        <ul className={s.list}>
          <li className={s.item}>
            <a href="/TeamProject_Duo" className={s.nav}>
              Who we are
            </a>
          </li>
          <li className={s.item}>
            <a href="#footer" className={s.nav}>
              Contacts
            </a>
          </li>
          <li className={s.item}>
            <a href="/TeamProject_Duo" className={s.nav}>
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
              Sign In
            </button>
          </div>
        )}
        <div className={s.wrapper} onClick={handleShow}>
          <p className={s.menu}>Menu</p>
          <img src={menu} alt="arrow" className={s.arrow} />
        </div>
      </div>
      {isShown && (
        <HeaderMobile handleClose={handleClose} userData={userData} handleToggle={handleToggle} avatar={avatar}/>
      )}
    </header>
  );
}
