/* eslint-disable no-use-before-define */
import React from 'react';
import { useState, useEffect } from 'react';
import Searchbar from './components/searchbar';
import Button from './components/button';
import s from './App.module.css';
import ImageGallery from './components/imageGallery';
import LoaderComponent from './components/loader';
import Modal from './components/modal';
import imageAPI from './services/image-api';

export default function App() {
  const [searchImages, setSearchImages] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [page, setPage] = useState(1);
  const [renderImages, setRenderImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchImages !== '') {
      setIsLoading(true);
      imageAPI
        .fetchImages(searchImages, page)
        .then(({ hits }) => {
          setRenderImages(prevrenderImages => [...prevrenderImages, ...hits]);
        })
        .then(onScroll)
        .catch(() => setError({ error }))
        .finally(() => setIsLoading(false));
    }
  }, [error, page, searchImages]);

  const hadleChangeImage = searchImages => {
    setSearchImages(searchImages);
    setPage(1);
    setRenderImages([]);
  };
  const handleNextPage = () => {
    setPage(page => page + 1);
  };
  const onScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const toggleModal = () => setOpenModal(!openModal);

  const modalContentSet = itemId => {
    const element = renderImages.find(({ id }) => id === itemId);
    setModalContent(element.largeImageURL);
  };
  const isNotLastPage = renderImages.length / page === 12;
  const btnBeView = renderImages.length > 0 && isNotLastPage;
  return (
    <div className={s.App}>
      <Searchbar onSubmit={hadleChangeImage} />
      <ImageGallery
        images={renderImages}
        onClick={toggleModal}
        onItemClick={modalContentSet}
      />
      {openModal && <Modal content={modalContent} onClose={toggleModal} />}
      {isLoading && <LoaderComponent />}
      {btnBeView && <Button onMore={handleNextPage} />}
    </div>
  );
}
