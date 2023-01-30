import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  openModal,
}) => {
  const handleOpenModal = () => openModal(largeImageURL);
  return (
    <li className="ImageGalleryItem" onClick={handleOpenModal}>
      <img src={webformatURL} alt="" />
    </li>
  );}
 


ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
