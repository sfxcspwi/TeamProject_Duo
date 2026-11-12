import s from './Header.module.css'
export function AuthNav({handleToggle,isShown}) {
    return (
      <div className={isShown ? s.userDataMenu : s.userData}>
        <button className={s.btn} onClick={() => handleToggle('signUp')}>
          Sign Up
        </button>
        <button className={s.btn} onClick={() => handleToggle('login')}>
          Sign In
        </button>
      </div>
    );
}