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
                    <ul className={s.navText}>
                        <li><p className={s.text}>Svobody str. 35</p></li>
                        <li><p className={s.text}>Kyiv</p></li>
                        <li><p className={s.text}>Ukraine</p></li>
                    </ul>
                </li>
    
                <li className={s.navItem}>
                    <h3 className={s.title}>Contact us</h3>
    
                    <ul className={s.socialList}>
    
                        <li className={s.socialItem}>
                            <a 
                                className={s.socialLink} 
                                href="https://www.instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <img className={s.socialIcon} src={instagram} alt="instagram" />
                            </a>
                        </li>

                        <li className={s.socialItem}>
                            <a 
                                className={s.socialLink} 
                                href="https://www.facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <img className={s.socialIcon} src={facebook} alt="facebook" />
                            </a>
                        </li>

                        <li className={s.socialItem}>
                            <a 
                                className={s.socialLink} 
                                href="https://www.whatsapp.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="WhatsApp"
                            >
                                <img className={s.socialIcon} src={whatsapp} alt="whatsapp" />
                            </a>
                        </li>
    
                    </ul>
                </li>
            </ul>
        </div>
    </footer>
  );
}