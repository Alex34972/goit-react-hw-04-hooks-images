import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';
const Button = ({ onMore }) => {
  return (
    <button type="button" className={s.Button} onClick={onMore}>
      Load more
    </button>
  );
};
Button.propTypes = {
  onMore: PropTypes.func.isRequired,
};
export default Button;
