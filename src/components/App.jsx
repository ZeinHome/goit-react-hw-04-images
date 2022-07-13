import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImages from './Services/Services';

export function App() {
  const [imageName, setImageName] = useState('');
  const [imagesArray, setImagesArray] = useState([]);
  const [pages, setPages] = useState(1);
  const [isloading, setIsloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tags, setTags] = useState(null);

  useEffect(() => {
    const ImagesDate = fetchImages(imageName, pages);
    if (imageName === '') {
      return;
    }
    setIsloading(true);

    ImagesDate.then(res => {
      return setImagesArray(state => [...state, ...res.hits]);
    }).finally(setIsloading(false));
  }, [imageName, pages]);

  const loadMore = () => {
    setPages(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleImageClick = ({ largeImageURL, tags }) => {
    toggleModal();

    return setLargeImageURL(largeImageURL, setTags(tags));
  };

  const handelSubmitForm = image => {
    setImagesArray([]);
    setImageName(image);
    setPages(1);
  };
  return (
    <Box>
      <Searchbar onSubmit={handelSubmitForm} />
      <ImageGallery
        imagesArray={imagesArray}
        isloading={isloading}
        showModal={showModal}
        largeImageURL={largeImageURL}
        tags={tags}
        handleImageClick={handleImageClick}
        toggleModal={toggleModal}
        loadMore={loadMore}
      />
      <ToastContainer />
    </Box>
  );
}
