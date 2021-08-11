import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchImages, setSearchImages] = useState('');

  const handleNameChange = event =>
    setSearchImages(event.currentTarget.value.toLowerCase().trim());

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchImages);
    setSearchImages('');
  };
  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchForm__button}>
          <span className={s.SearchForm__button_label}>Search</span>
        </button>

        <input
          className={s.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchImages}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
