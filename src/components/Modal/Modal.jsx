import PropTypes from 'prop-types';
import { useCallback, useRef } from 'react';
import { useEffect } from 'react';

export const Modal = ({ closeModal, modalUrl }) => {
  const handleClick = event => {
    if (event.target.className !== 'Overlay') return;
    closeModal();
  };

  const closeModalByPressingEscape = useCallback(
    event => {
      if (event.key !== 'Escape') return;
      closeModal();
    },
    [closeModal]
  );
  const ref = useRef();

  useEffect(() => {
    window.addEventListener('keydown', closeModalByPressingEscape);

    return () =>
      window.removeEventListener('keydown', closeModalByPressingEscape);
  }, [closeModalByPressingEscape]);
  return (
    <div className="Overlay" onClick={handleClick} ref={ref}>
      <div className="Modal">
        <img src={modalUrl} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalUrl: PropTypes.string.isRequired,
};
