import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { getImagesApi } from 'utils/imagesApi';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { useCallback } from 'react';

//  state = {
//     query: '',
//     images: [],
//     error: null,
//     loader: false,
//     page: 1,
//     isModalOpen: false,
//     modalUrl: '',
//   };

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

      setImages(prev => (
        [...prev, ...dataImages.data.hits]
      ));
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

// export class App extends Component {
//   state = {
//     query: '',
//     images: [],
//     error: null,
//     loader: false,
//     page: 1,
//     isModalOpen: false,
//     modalUrl: '',
//   };

//

//   openModal = url => {
//     this.setState({ isModalOpen: true, modalUrl: url });
//   };

//   closeModal = () => {
//     this.setState({ isModalOpen: false });
//   };

// changeQuery = query => {
//   this.setState({images:[]})
//   this.setState({ query });
//   this.setState({ page: 1 });
// };

// loadNextPage = () => {
//   this.setState({ page: this.state.page + 1 });
// };

//   async componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.query !== this.state.query ||
//       prevState.page !== this.state.page
//     ) {
//       this.getImages();
//     }
//   }

// getImages = async () => {
//   this.setState({ loader: true });
//   try {
//     const { query, page } = this.state;
//     const dataImages = await getImagesApi(query, page);

//     this.setState(prev => ({
//       images: [...prev.images, ...dataImages.data.hits],
//     }));
//   } catch (error) {
//     this.setState({ error: error.message });
//   } finally {
//     this.setState({ loader: false });
//   }
// };

//   render() {
//     const { images, error, loader, query, isModalOpen, modalUrl } = this.state;
//     if (error) return <h1>{error}</h1>;

// return (
//   <>
//     <Searchbar onSubmit={this.changeQuery} />
//     {loader === true && <Loader />}
//     {query !== '' && (
//       <ImageGallery images={images} openModal={this.openModal} />
//     )}
//     {images.length > 0 && loader === false && (
//       <Button onClick={this.loadNextPage} />
//     )}
//     {isModalOpen && (
//       <Modal closeModal={this.closeModal} modalUrl={modalUrl} />
//     )}
//   </>
// );
//   }
// }
