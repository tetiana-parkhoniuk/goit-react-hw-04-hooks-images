import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, largeImageURL }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      console.log(event);
      onClose();
    }
  };

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div className={styles.modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot,
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};


////==== Original Code ====////

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydow', this.handleKeyDown);
//   }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleOverlayClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={styles.overlay} onClick={this.handleOverlayClick}>
//         <div className={styles.modal}>
//           <img src={this.props.largeImageURL} alt="" />
//         </div>
//       </div>,
//       modalRoot,
//     );
//   }
// }
