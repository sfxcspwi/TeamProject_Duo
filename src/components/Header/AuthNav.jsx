import s from './Header.module.css'
export function AuthNav({handleToggle}) {
    return (
      <div className={s.userData}>
        <button className={s.btn} onClick={() => handleToggle('signUp')}>
          Sign Up
        </button>
        <button className={s.btn} onClick={() => handleToggle('login')}>
          Sign In
        </button>
      </div>
    );
}