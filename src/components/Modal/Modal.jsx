import s from './Modal.module.css';
import { createPortal } from 'react-dom';
const modalRoot = document.getElementById("modal-root");
export function Modal({children}){
    return createPortal(
            <div className={s.overlay}>
            {children}
        </div>,
        modalRoot
    )
}