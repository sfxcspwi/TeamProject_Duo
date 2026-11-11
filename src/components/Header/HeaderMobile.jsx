import s from './Header.module.css'
export function HeaderMobile({handleClose,userData,handleToggle,avatar}) {
    return (
      <div className={s.menuOverlay}>
        <div className={s.containerMenu}>
          <div className={s.menuWrapper}>
            <ul className={s.Menulist}>
              <li className={s.item}>
                <a href="/TeamProject_Duo" className={s.nav}>
                  Who we are
                </a>
              </li>
              <li className={s.item}>
                <a href="#footer" onClick={handleClose} className={s.nav}>
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
                <button className={s.btn} onClick={() => handleToggle('login')}>
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}