import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');
export default function Modal({ onClose, content }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const handleKeyDown = e => {
    if (e.code === `Escape`) {
      onClose();
    }
  };
  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img className={s.imgModal} src={content} alt="" />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};
