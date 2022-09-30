const filter = 'name,capital,population,flags,languages';
function fetchCountries(counries) {
  return fetch(
    `https://restcountries.com/v3.1/name/${counries}?fields=${filter}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchCountries };

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков
