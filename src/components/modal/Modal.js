import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  handleKeyDown = e => {
    if (e.code === `Escape`) {
      this.props.onClose();
    }
  };
  render() {
    const { content } = this.props;
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>
          <img className={s.imgModal} src={content} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};
