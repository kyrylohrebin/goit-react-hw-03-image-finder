import React, { Component } from 'react';

import api from './service/Api';
import styles from './App.module.css';

import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import Button from './Components/Button/Button';
import SpinLoader from './Components/Loader/Loader';
import Modal from './Components/Modal/Modal';

class App extends Component {
  state = {
    query: '',
    pageNumber: 1,
    isLoading: false,
    error: false,
    images: [],
    totalPages: 0,
    newPageCords: 0,
    modalSrc: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, pageNumber } = this.state;
    if (prevState.query !== query) {
      this.fetchData();
    }
    if (
      prevState.pageNumber !== pageNumber &&
      prevState.pageNumber < pageNumber
    ) {
      await this.fetchData();
      this.scrollToNextPage();
    }
  }

  fetchData = async () => {
    const { query, pageNumber } = this.state;
    try {
      const data = await api(query, pageNumber);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        isLoading: false,
        totalPages:
          prevState.totalPages > 0
            ? prevState.totalPages
            : Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      this.setState({
        error: true,
        isLoading: false,
      });
    }
  };

  scrollToNextPage = () => {
    const { newPageCords } = this.state;
    window.scrollTo({
      top: newPageCords,
      behavior: 'smooth',
    });
  };

  onSearch = query => {
    this.setState({
      query: query,
      pageNumber: 1,
      isLoading: true,
      error: false,
      images: [],
      totalPages: 0,
      newPageCords: 0,
    });
  };

  loadMore = () => {
    const cords = document.documentElement.scrollHeight - 170;
    this.setState(prevState => ({
      isLoading: true,
      newPageCords: cords,
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  onImageClick = event => {
    const {
      dataset: { url },
    } = event.target;
    this.setState({
      modalSrc: url,
    });
  };

  onCloseModal = () => {
    this.setState({
      modalSrc: '',
    });
  };

  render() {
    const { images, pageNumber, totalPages, isLoading, modalSrc } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSearch={this.onSearch} />
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.onImageClick} />
        )}
        {isLoading && <SpinLoader />}
        {pageNumber < totalPages && <Button onClickHandler={this.loadMore} />}
        {modalSrc && (
          <Modal onCloseModal={this.onCloseModal}>
            <img src={modalSrc} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
