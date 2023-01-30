import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  

  return (
    <ul className="ImageGallery">
      {images.map(({id, webformatURL, largeImageURL}) => {
        
        return (
          <ImageGalleryItem
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            openModal={openModal}
            key={id}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
