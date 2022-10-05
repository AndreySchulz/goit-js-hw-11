import { getPhotos } from './axiosImage';
import { refs } from './refs';
import { Notify } from 'notiflix';

export function requestOnServer(query, pageNumber) {
  getPhotos(query, pageNumber).then(data => {
    const { hits, totalHits, total } = data;
    console.log(data);
    if (totalHits === 0) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again'
      );
      return;
    }
    Notify.success(`Hooray! We found ${totalHits} images.`);

    refs.gallery.insertAdjacentHTML('beforeend', createCardImage(hits));

    if (pageNumber === totalHits) {
      refs.loadMoreBtn.classList.add('is-hidden');
      return;
    }
    refs.loadMoreBtn.classList.remove('is-hidden');
  });
}
export function createCardImage(hits) {
  return hits
    .map(hit => {
      const {
        likes,
        views,
        comments,
        downloads,
        tags,
        largeImageURL,
        webformatURL,
      } = hit;
      return `<div class="photo-card">
  <img class="photo-card__img"src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');
}
