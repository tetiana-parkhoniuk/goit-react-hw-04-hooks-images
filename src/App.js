import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery ';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import Modal from 'components/Modal';
import { fetchImages } from 'services/api';
import styles from './App.module.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [reqStatus, setReqStatus] = useState('idle');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (searchQuery === '') return;
    async function getImages() {
      try {
        setReqStatus('pending');
        const images = await fetchImages(
          searchQuery,
          page
        );
        setImages(prevState => [...prevState, ...images]);
        setReqStatus('fulfilled');
        scrollOnLoadMore();
      } catch (error) {
        setReqStatus('rejected');
        toast.error('Something went worng, please try again later.');
      }
    }
    getImages();
  }, [searchQuery, page]);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const incrementPage = () => {
    setPage(prevPage => prevPage +1)
  };

  const scrollOnLoadMore = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const toggleModal = () => {
    setSelectedImage(!selectedImage);
  };

  const handleSelectedImage = imageURL => {
    setSelectedImage(imageURL);
  };


  const isLoading = reqStatus === 'pending';
  const showLoadMoreBtn = images.length > 0;

  return (
    <div className={styles.app}>
        <Toaster position="top-right" toastOptions={{ duration: 2000 }} />

        <Searchbar onSubmit={handleFormSubmit} />

        <ImageGallery images={images} onSelect={handleSelectedImage} />

        {isLoading && <Spinner />}

        {showLoadMoreBtn && <Button onClick={incrementPage} />}

        {selectedImage && (
          <Modal onClose={toggleModal} largeImageURL={selectedImage} />
        )}
    </div>
  )
}

////==== Original Code ====////

// export default class App extends Component {
//   state = {
//     searchQuery: null,
//     images: [],
//     page: 1,
//     reqStatus: 'idle',
//     selectedImage: null,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchQuery !== this.state.searchQuery) {
//       try {
//         this.setState({ reqStatus: 'pending' });

//         const images = await fetchImages(
//           this.state.searchQuery,
//           this.state.page,
//         );

//         this.setState({ images, reqStatus: 'fulfilled' });
//       } catch (error) {
//         this.setState({ reqStatus: 'rejected' });
//         toast.error('Something went worng, please try again later.');
//       }
//     } else if (prevState.page !== this.state.page) {
      // try {
      //   this.setState({ reqStatus: 'pending' });

      //   const images = await fetchImages(
      //     this.state.searchQuery,
      //     this.state.page,
      //   );

      //   this.setState({
      //     images: [...this.state.images, ...images],
      //     reqStatus: 'fulfilled',
      //   });
      //   this.scrollOnLoadMore();
      // } catch (error) {
      //   this.setState({ reqStatus: 'rejected' });
      //   toast.error('Something went worng, please try again later.');
      // }
//     }
//   }

//   handleFormSubmit = searchQuery => {
//     this.setState({ searchQuery, page: 1, images: [] });
//   };

//   incrementPage = () => {
//     this.setState({ page: this.state.page + 1 });
//   };

//   scrollOnLoadMore = () => {
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: 'smooth',
//     });
//   };

//   toggleModal = () => {
//     this.setState(({ selectedImage }) => ({
//       selectedImage: !selectedImage,
//     }));
//   };

//   handleSelectedImage = imageURL => {
//     this.setState({ selectedImage: imageURL });
//   };

//   render() {
//     const { images, reqStatus, selectedImage } = this.state;
//     const isLoading = reqStatus === 'pending';
//     const showLoadMoreBtn = images.length > 0;

//     return (
//       <div className={styles.app}>
//         <Toaster position="top-right" toastOptions={{ duration: 2000 }} />

//         <Searchbar onSubmit={this.handleFormSubmit} />

//         {<ImageGallery images={images} onSelect={this.handleSelectedImage} />}

//         {isLoading && <Spinner />}

//         {showLoadMoreBtn && <Button onClick={this.incrementPage} />}

//         {selectedImage && (
//           <Modal onClose={this.toggleModal} largeImageURL={selectedImage} />
//         )}
//       </div>
//     );
//   }
// }
