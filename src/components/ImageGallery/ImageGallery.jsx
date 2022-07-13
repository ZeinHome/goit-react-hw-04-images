import { ImageGalleryContainer, Container } from './ImageGallery.styled';
import ImageGalleryItems from '../ImageGalleryItems/ImageGalleryItems ';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';

export default function ImageGallery({
  imagesArray,
  isloading,
  showModal,
  largeImageURL,
  tags,
  toggleModal,
  handleImageClick,
  loadMore,
}) {
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
