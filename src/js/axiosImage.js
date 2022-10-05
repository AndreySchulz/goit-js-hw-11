import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
  image_type: 'photo',
  safesearch: true,
  orientation: 'horizontal',
  per_page: 40,
});
const keyApi = 'key=30341121-6e6aad8b98e32722614d9b080';
export async function getPhotos(findPhoto, pageNumber) {
  const url = `?${keyApi}&q=${findPhoto}&${searchParams}&page=${pageNumber}`;
  return await axios.get(url).then(response => {
    const { data } = response;
    return data;
  });
}
// https://pixabay.com/api/?key=30341121-6e6aad8b98e32722614d9b080&q=yellow+flowers&image_type=photo&pretty=true
// https://pixabay.com/api/?key=30341121-6e6aad8b98e32722614d9b080&q=cat&image_type=photo&safesearch=true&orientation=horizontal
// key - твой уникальный ключ доступа к API.
// q - термин для поиска. То, что будет вводить пользователь.
// image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
// orientation - ориентация фотографии. Задай значение horizontal.
// safesearch - фильтр по возрасту. Задай значение true.
