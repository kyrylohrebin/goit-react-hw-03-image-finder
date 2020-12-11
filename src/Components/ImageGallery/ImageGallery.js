import styles from './ImageGallery.module.css';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={styles.ImageGallery}>
      {images.map(image => {
        const { webformatURL, largeImageURL, id } = image;
        return (
          <ImageGalleryItem
            key={id}
            imageSrc={webformatURL}
            imageUrl={largeImageURL}
            handler={onImageClick}
          />
        );
      })}
    </ul>
  );
}

export default ImageGallery;
