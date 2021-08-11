import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
export default class Searchbar extends Component {
  state = {
    searchImages: '',
  };
  handleNameChange = event => {
    this.setState({
      searchImages: event.currentTarget.value.toLowerCase().trim(),
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { searchImages } = this.state;
    this.props.onSubmit(searchImages);
    this.setState({ searchImages: '' });
  };
  render() {
    const { searchImages } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
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
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
