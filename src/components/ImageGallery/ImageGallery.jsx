import { useEffect, useState } from 'react';
import { ImageGalleryContainer, Container } from './ImageGallery.styled';
import ImageGalleryItems from '../ImageGalleryItems/ImageGalleryItems ';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import fetchImages from '../Services/Services';

export default function ImageGallery({ imageName }) {
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

  return (
    <Container>
      {isloading && <Loader />}
      <ImageGalleryContainer>
        <ImageGalleryItems
          imagesArray={imagesArray}
          onImageClick={handleImageClick}
        />
        {showModal && (
          <Modal onCloseModal={toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </ImageGalleryContainer>
      {imagesArray.length !== 0 && <Button onLoadMore={loadMore} />}
    </Container>
  );
}
