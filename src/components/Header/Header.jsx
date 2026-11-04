import { useState } from "react"
import s from './Header.module.css';
// import { ReactComponent as Avatar } from '../Images/avatar.png';
import avatar from '../Icons/avatar.svg';
import logo from '../Icons/logo.svg'
export function Header({handleToggle}) {
    const [isLogin, setIsLogin] = useState(() => JSON.parse(localStorage.getItem('isLogin')) ?? null);
    const [userName, setUserName] = useState(() => JSON.parse(localStorage.getItem('user-data')) ?? null);
    
    return (
        <header className={s.header}>
            <div className={s.container}>
                <img src={logo} alt="logo" className={s.logo} />
                <ul className={s.list}>
                    <li className={s.item}><a href="#" className={s.nav}>Who we are</a></li>
                    <li className={s.item}><a href="#" className={s.nav}>Contacts</a></li>
                    <li className={s.item}><a href="#" className={s.nav}>Menu</a></li>
                </ul>
                {isLogin ? (
                    <div className={s.userData}>
                        <p className={s.userName}>{userName}</p>
                        <img src={avatar} alt="avatar" />
                    </div>
                ) : (
                        <div className={s.userData}>
                            <button className={s.btn} onClick={()=> handleToggle('signUp')}>Sign Up</button>
                            <button className={s.btn} onClick={()=> handleToggle("login")}>Login</button>
                        </div>
                    )
                }
            </div>
        </header>
    )
}