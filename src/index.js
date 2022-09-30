import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import API from './fetchCountries';

const refs = {
  inputSearch: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;

refs.inputSearch.addEventListener(
  'input',
  debounce(onHanndleInput, DEBOUNCE_DELAY)
);

function onHanndleInput(event) {
  event.preventDefault();
  let searchCountry = event.target.value;
  if (searchCountry.length > 1) {
    API.fetchCountries(searchCountry.trim())
      .then(renderCountryCard)
      .catch(onErrorSearch);
    return;
  }
  claenDiv();
}

function renderCountryCard(response) {
  const [{ name, capital, population, flags, languages }] = response;

  if (response.length === 1) {
    createCardCountry(name, capital, population, flags, languages);
  }

  if (response.length >= 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  if (response.length >= 2 && response.length < 10) {
    createListCountry(response);
  }
}

function claenDiv() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

function createCardCountry(name, capital, population, flags, languages) {
  claenDiv();
  const countryCard = `
    
        <h1><img src="${flags.svg}" alt="${name.official}" width="50px" style="
    margin-right: 10px;">${name.official}</h1>
        <ul style ="list-style: none;
  padding: 0;">
        <li><b>Capital:</b> ${capital[0]}</li>
        <li><b>Population:</b> ${population}</li>
        <li><b>Languages:</b> ${Object.values(languages)}</li>
        </ul>`;
  refs.countryInfo.innerHTML = countryCard;
}

function createListCountry(response) {
  claenDiv();
  const countryListItem = response
    .map(country => {
      return `<li class="country-list__item"><img src="${country.flags.svg}" alt="${country.name.official}" width="50px" style="
    margin-right: 10px;
">${country.name.official}</li>`;
    })
    .join('');

  refs.countryList.insertAdjacentHTML('afterbegin', countryListItem);
}

function onErrorSearch() {
  return Notify.failure('Oops, there is no country with that name', claenDiv());
}
