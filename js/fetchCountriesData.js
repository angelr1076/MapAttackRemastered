export const fetchRestApi = async () => {
  const response = await fetch(
    'https://restcountries.com/v3.1/all?fields=cca2,name,capital,subregion,flags,population,languages,latlng'
  );
  const data = await response.json();
  return data;
};
