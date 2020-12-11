import styles from './Button.module.css';

function Button({ onClickHandler }) {
  return (
    <button className={styles.Button} onClick={onClickHandler}>
      Load more...
    </button>
  );
}

export default Button;
