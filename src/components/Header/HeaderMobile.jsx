import s from './Header.module.css'
import { UserMenu } from './UserMenu';
import { AuthNav } from './AuthNav';
export function HeaderMobile({handleClose,userData,handleToggle,avatar,isShown}) {
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
              <UserMenu avatar={avatar} userData={userData} isShown={isShown}/>
            ) : (
              <AuthNav handleToggle={handleToggle} isShown={isShown}/>
            )}
          </div>
        </div>
      </div>
    );
}