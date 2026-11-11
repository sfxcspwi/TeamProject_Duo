import s from './Header.module.css'
export function UserMenu({userData,avatar}) {
    return (
      <div className={s.userData}>
        <p className={s.userName}>{userData.userName}</p>
        <img src={avatar} alt="avatar" />
      </div>
    );
}