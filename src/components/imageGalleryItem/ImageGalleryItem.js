import { Component } from 'react';
import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  modalContent = id => {
    this.props.onItemClick(id);
  };
  render() {
    const { id, webformatURL, tags } = this.props;
    return (
      <li className={s.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          className={s.ImageGalleryItem__image}
          onClick={() => this.modalContent(id)}
        />
      </li>
    );
  }
}
ImageGalleryItem.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
