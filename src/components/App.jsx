import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { getImagesApi } from 'utils/imagesApi';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { useCallback } from 'react';

export const App = () => {
  const [query, setQuery] = useState();
  const [images, setImages] = useState();
  const [error, setError] = useState();
  const [loader, setLoader] = useState();
  const [page, setPage] = useState();
  const [isModalOpen, setIsModalOpen] = useState();
  const [modalUrl, setModalUrl] = useState();

  const openModal = url => {
    setIsModalOpen(true);
    setModalUrl(url);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const changeQuery = query => {
    setImages([]);
    setQuery(query);
    setPage(1);
  };

  const getImages = useCallback(async () => {
    setLoader(true);
    try {
      const dataImages = await getImagesApi(query, page);

      setImages(prev => [...prev, ...dataImages.data.hits]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoader(false);
    }
  }, [page, query]);

  const loadNextPage = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (query) {
      getImages();
    }
  }, [query, page, getImages]);

  return (
    <>
      <Searchbar onSubmit={changeQuery} />
      {loader === true && <Loader />}
      {images && images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {images && images.length > 0 && loader === false && (
        <Button onClick={loadNextPage} />
      )}
      {isModalOpen && <Modal closeModal={closeModal} modalUrl={modalUrl} />}
    </>
  );
};
