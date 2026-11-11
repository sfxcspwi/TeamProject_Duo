import s from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
const modalRoot = document.getElementById('modal-root');
export function Modal({ children, onClose }) {
      useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
          document.body.style.overflow = '';
        };
      }, []);
  const closeModal = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return createPortal(
    <div className={s.overlay} onClick={closeModal}>
      {children}
    </div>,
    modalRoot
  );
}
