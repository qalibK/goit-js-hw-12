import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 15;
    this.baseUrl = 'https://pixabay.com/api/';
  }

  async fetchImages() {
    const url = `${this.baseUrl}?key=42616276-59c99055eec179e7b1bf68313&q=${this.searchQuery}&lang=en&per_page=${this.perPage}&Page=${this.page}`;
    this.incrementPage();

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.total === 0) {
        onError();
      }

      return data.hits;
    } catch (error) {
      throw new Error('Failed to fetch images');
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export function onError(error) {
  iziToast.show({
    message: `Sorry, there are no images matching <br> your search query. Please, try again!`,
    position: 'topRight',
    timeout: 5000,
    backgroundColor: '#ef4040',
    messageColor: '#ffffff',
    messageSize: '12',
    close: true,
    closeOnEscape: true,
    progressBarColor: '#B51B1B',
    progressBar: true,
    layout: 2,
    maxWidth: 432,
    maxHeigth: 88,
    animateInside: true,
    iconUrl: './img/x-octagon.svg',
    transitionIn: 'fadeInRight',
    transitionOut: 'fadeOutRight',
  });
}
