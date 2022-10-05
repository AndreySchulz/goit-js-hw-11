import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { refs } from './js/refs';
import { requestOnServer, createCardImage } from './js/requestOnServer';

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
}

function onClickLoadMore(e) {
  pageNumber += 1;

  requestOnServer(query, pageNumber);
}

refs.searchForm.addEventListener('submit', onSubmitForm);
refs.loadMoreBtn.addEventListener('click', onClickLoadMore);

function cleanDiv() {
  refs.gallery.innerHTML = '';
}
