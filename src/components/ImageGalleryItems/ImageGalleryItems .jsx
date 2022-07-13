import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

function ImageGalleryItems({ imagesArray, onImageClick }) {
  return imagesArray.map(({ previewURL, id, type, largeImageURL, tags }) => {
    return (
      <GalleryItem
        key={id}
        onClick={() => onImageClick({ largeImageURL, tags })}
      >
        <GalleryItemImage src={previewURL} alt={type} />
      </GalleryItem>
    );
  });
}

export default ImageGalleryItems;
