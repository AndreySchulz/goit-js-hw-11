import { getPhotos } from './axiosImage';
import { refs } from './refs';
import { Notify } from 'notiflix';
import { createCardImage } from './createCard';

export function requestOnServer(query, pageNumber) {
  getPhotos(query, pageNumber).then(data => {
    const { hits, totalHits, total } = data;

    if (totalHits === 0) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again'
      );
      return;
    }
    Notify.success(`Hooray! We found ${totalHits} images.`);

    refs.gallery.insertAdjacentHTML('beforeend', createCardImage(hits));

    if (hits.length < 40) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");

      return;
    }
    refs.loadMoreBtn.classList.remove('is-hidden');

    new SimpleLightbox('.photo-card a ', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  });
}

// const lightbox = $('.photo-card a').simpleLightbox({
//   /* options */
// });
