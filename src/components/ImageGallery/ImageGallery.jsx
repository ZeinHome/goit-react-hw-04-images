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
    if (imageName !== '') {
      const ImagesDate = fetchImages(imageName, pages);
      setIsloading(true);

      ImagesDate.then(res => {
        return setImagesArray(res.hits, setPages(1));
      }).finally(setIsloading(false));
    }
  }, [imageName]);
  useEffect(() => {
    if (pages !== 1) {
      setIsloading(true);

      const ImagesDate = fetchImages(imageName, pages);

      ImagesDate.then(res => {
        return setImagesArray([...imagesArray, ...res.hits]);
      }).finally(setIsloading(false));
    }
  }, [pages]);

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
