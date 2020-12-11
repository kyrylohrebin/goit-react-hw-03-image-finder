import styles from './ImageGalleryItem.module.css';

function ImageGalleryItem({ imageSrc, imageUrl, handler }) {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={imageSrc}
        alt=""
        data-url={imageUrl}
        className={styles.ImageGalleryItem_image}
        onClick={handler}
      />
    </li>
  );
}

export default ImageGalleryItem;
