import axios from 'axios';
import { appendHitsMarkup, clearHitsContainer } from './js/render-functions';
import { ImagesApiService, onError } from './js/pixabay-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  waitingText: document.querySelector('.js-waiting-text'),
  imagesContainer: document.querySelector('.js-images-container'),
  loadMoreButton: document.querySelector('.js-load-more-btn'),
};

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  refs.loadMoreButton.style.display = 'block';
  refs.waitingText.style.display = 'block';

  imagesApiService.query = e.currentTarget.elements.query.value;
  imagesApiService.resetPage();

  if (imagesApiService.query === '') {
    onError();
    clearWaitingText();
    clearHitsContainer(refs.imagesContainer);
    return;
  }

  try {
    const hits = await imagesApiService.fetchImages();
    clearWaitingText();
    clearHitsContainer(refs.imagesContainer);
    appendHitsMarkup(hits, refs.imagesContainer);
    initializeSimpleLightbox();
  } catch (error) {
    onError(error);
  }

  refs.searchForm.reset();
}

async function onLoadMore() {
  try {
    const hits = await imagesApiService.fetchImages();
    appendHitsMarkup(hits, refs.imagesContainer);
    initializeSimpleLightbox();
  } catch (error) {
    onError(error);
  }
}

function clearWaitingText() {
  refs.waitingText.style.display = 'none';
}

function initializeSimpleLightbox() {
  const simpleLightbox = new SimpleLightbox('.images a', {
    captionPosition: 'bottom',
    captionDelay: 250,
    captionsData: 'alt',
  });
  simpleLightbox.refresh();
}
