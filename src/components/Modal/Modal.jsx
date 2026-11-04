import s from './Modal.module.css';
export function Modal({children}){
    return (
        <div className={s.overlay}>
            <div className={s.modal}>
                {children}
            </div>
        </div>
    )
}