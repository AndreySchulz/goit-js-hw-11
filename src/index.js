import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './js/refs';
import { requestOnServer } from './js/requestOnServer';

let pageNumber = 1;
let query = '';

function onSubmitForm(e) {
  e.preventDefault();
  cleanDiv();
  const {
    elements: { searchQuery },
  } = e.currentTarget;

  query = searchQuery.value.trim().toLowerCase();
  requestOnServer(query, pageNumber);
  refs.loadMoreBtn.addEventListener('click', onClickLoadMore);
}

function onClickLoadMore(e) {
  pageNumber += 1;

  requestOnServer(query, pageNumber);
}

refs.searchForm.addEventListener('submit', onSubmitForm);

function cleanDiv() {
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
}
