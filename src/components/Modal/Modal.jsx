import s from './Modal.module.css';
import { createPortal } from 'react-dom';
const modalRoot = document.getElementById("modal-root");
export function Modal({ children, onClose }) {
    const closeModal = e => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    }
    return createPortal(
        <div className={s.overlay} onClick={closeModal}>
            {children}
        </div>,
        modalRoot
    )
}