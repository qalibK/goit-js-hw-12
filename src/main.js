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

  refs.waitingText.style.display = 'block';

  imagesApiService.query = e.currentTarget.elements.query.value;
  imagesApiService.resetPage();

  if (imagesApiService.query === '') {
    onError();
    clearWaitingText();
    refs.loadMoreButton.style.display = 'none';
    clearHitsContainer(refs.imagesContainer);
    return;
  }

  try {
    const hits = await imagesApiService.fetchImages();
    refs.loadMoreButton.style.display = 'block';
    clearWaitingText();
    clearHitsContainer(refs.imagesContainer);
    appendHitsMarkup(hits, refs.imagesContainer);
    initializeSimpleLightbox();
  } catch (error) {
    refs.loadMoreButton.style.display = 'none';
    console.log('Failed to load more images');
  }

  refs.searchForm.reset();
}

async function onLoadMore(e) {
  e.preventDefault();

  refs.waitingText.style.display = 'block';

  try {
    const hits = await imagesApiService.fetchImages();
    clearWaitingText();
    appendHitsMarkup(hits, refs.imagesContainer);
    initializeSimpleLightbox();
    window.scrollBy({
      top:
        document.querySelector('.gallery-item').getBoundingClientRect().height *
        2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log('Failed to load more images');
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
