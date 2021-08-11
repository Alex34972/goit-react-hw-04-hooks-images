import React from 'react';
import { Component } from 'react';
import Searchbar from './components/searchbar';
import Button from './components/button';
import s from './App.module.css';
import ImageGallery from './components/imageGallery';
import LoaderComponent from './components/loader';
import Modal from './components/modal';
import imageAPI from './services/image-api';

export default class App extends Component {
  state = {
    searchImages: '',
    modalContent: '',
    page: 1,
    renderImages: [],
    isLoading: false,
    openModal: false,
    error: null,
  };

  hadleChangeImage = image => {
    this.setState({
      searchImages: image,
      page: 1,
      renderImages: [],
    });
  };

  handleNextPage = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };
  onScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  toggleModal = () => {
    this.setState(({ openModal }) => ({ openModal: !openModal }));
  };
  toggleLoading = () => {
    this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
  };
  modalContentSet = itemId => {
    const { renderImages } = this.state;
    const element = renderImages.find(({ id }) => id === itemId);
    this.setState({ modalContent: element.largeImageURL });
  };
  componentDidUpdate(prevProps, prevState) {
    const { searchImages, page } = this.state;
    if (prevState.searchImages !== searchImages || prevState.page !== page) {
      this.toggleLoading();
      this.onScroll();
      imageAPI
        .fetchImages(searchImages, page)
        .then(({ hits }) => {
          this.setState(({ renderImages }) => {
            return { renderImages: [...renderImages, ...hits] };
          });
        })
        .then(this.onScroll)
        .catch(error => this.setState({ error }))
        .finally(this.toggleLoading);
    }
  }
  render() {
    const { renderImages, isLoading, page, modalContent, openModal } =
      this.state;
    const isNotLastPage = renderImages.length / page === 12;
    const btnBeView = renderImages.length > 0 && isNotLastPage;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.hadleChangeImage} />
        <ImageGallery
          images={renderImages}
          onClick={this.toggleModal}
          onItemClick={this.modalContentSet}
        />
        {openModal && (
          <Modal content={modalContent} onClose={this.toggleModal} />
        )}
        {isLoading && <LoaderComponent />}
        {btnBeView && <Button onMore={this.handleNextPage} />}
      </div>
    );
  }
}
