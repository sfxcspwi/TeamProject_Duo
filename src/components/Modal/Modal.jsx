import s from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
const modalRoot = document.getElementById('modal-root');
export function Modal({ children, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
      useEffect(() => {
        document.body.style.overflow = 'hidden';

        const handleKeyDown = e => {
          if (e.code === 'Escape') {
            handleClosing()            
          }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
          document.body.style.overflow = '';
          window.removeEventListener('keydown',handleKeyDown);
        };
      }, [onClose]);
  const handleClosing = () => {
    setIsClosing(true);
  }
  const closeModal = e => {
    if (e.currentTarget === e.target) {
      handleClosing()
    }
  };
  return createPortal(
    <div
      className={`${s.overlay} ${isClosing ? s.overlayClosing : ''}`}
      onClick={closeModal}
      onAnimationEnd={() => {
        if (isClosing) onClose();
      }}
    >
      {children}
    </div>,
    modalRoot
  );
}
