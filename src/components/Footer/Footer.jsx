import s from './Footer.module.css';
import logo from "../Icons/logo.svg";
import facebook from "../Icons/facebook.svg";
import instagram from "../Icons/instagram.svg";
import whatsapp from "../Icons/whatsapp.svg";

export function Footer() {

  return (
    <footer className={s.footer}>
        <div className={`${s.container} ${s.content}`}>
            <img className={s.logo} src={logo} alt="logo" />

            <ul className={s.navList}>

                <li className={s.navItem}>
                    <h3 className={s.title}>Address</h3>
                    <p className={s.text}>Svobody str. 35 <br/> Kyiv <br /> Ukraine</p>
                </li>
    
                <li className={s.navItem}>
                    <h3 className={s.title}>Contact us</h3>
    
                    <ul className={s.socialList}>
    
                        <li className={s.socialItem}>
                            <button className={s.socialBtn} type="button">
                            <img className={s.socialIcon} src={instagram}/>
                            </button>
                        </li>
    
                        <li className={s.socialItem}>
                            <button className={s.socialBtn} type="button">
                            <img className={s.socialIcon} src={facebook}/>
                            </button>
                        </li>
    
                        <li className={s.socialItem}>
                            <button className={s.socialBtn} type="button">
                            <img className={s.socialIcon} src={whatsapp}/>
                            </button>
                        </li>
    
                    </ul>
                </li>
            </ul>
        </div>
    </footer>
  );
}