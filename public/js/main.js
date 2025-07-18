import { fetchRestApi } from './fetchCountriesData.js';
import { initMap, loadGoogleMapsScript } from './mapUtils.js';
import {
  getScore,
  incrementScore,
  getWrongAnswers,
  incrementWrongAnswers,
  resetGame,
} from './gameLogic.js';

let countries = [];
let selectedCountry = '';
const yearElement = document.getElementById('year');
yearElement.textContent = new Date().getFullYear();

const initCountriesAPI = async () => {
  try {
    countries = await fetchRestApi();
    const selectedCountryIndex = Math.floor(Math.random() * countries.length);
    displayCountryInfo(countries[selectedCountryIndex].cca2);
  } catch (error) {
    console.error('Error fetching countries data:', error);
  }
};

const displayCountryInfo = async countryAlphaCode => {
  const countryData = countries.find(
    country => country.cca2 === countryAlphaCode
  );

  if (!countryData) return;

  selectedCountry = countryData.name.common;
  const { capital, flags, population, subregion, languages, latlng } =
    countryData;
  const languageCount = Object.keys(languages).length;
  const capitalCount = capital ? Object.keys(capital).length : 0;

  document.querySelector('#flag-container img').src = flags.png;
  document.querySelector('#question').innerHTML = `
  I am located in ${subregion === 'Caribbean' ? 'the' : ''} ${subregion}. ${
    capital && capitalCount > 0
      ? `${Object.values(capital).join(', ')} ${
          capitalCount > 1 ? 'are' : 'is'
        } my capital ${capitalCount > 1 ? 'cities' : 'city'}`
      : 'I have no official capital city'
  }. My population is ${population.toLocaleString()}.`;

  await loadGoogleMapsScript(latlng[0], latlng[1]);

  populateCountryOptions(countryData);
};

const populateCountryOptions = correctCountry => {
  const incorrectCountries = countries.filter(
    country => country.cca2 !== correctCountry.cca2
  );
  const randomIncorrectOptions = [];

  while (randomIncorrectOptions.length < 5) {
    const randomIndex = Math.floor(Math.random() * incorrectCountries.length);
    const randomCountry = incorrectCountries[randomIndex];
    if (!randomIncorrectOptions.includes(randomCountry)) {
      randomIncorrectOptions.push(randomCountry);
    }
  }

  const options = [...randomIncorrectOptions, correctCountry];
  options.sort(() => Math.random() - 0.5);

  const optionsHTML = options
    .map(
      country => `
      <label class="answers">
        <input type="radio" name="country" value="${country.name.common}" />
        ${country.name.common}
      </label>`
    )
    .join('');

  document.querySelector('#inputs').innerHTML = optionsHTML;
};

const handleUserResponse = (element, correctAnswer) => {
  const userAnswer = element.value;

  if (userAnswer === correctAnswer) {
    incrementScore();
    document.querySelector('#score').innerHTML = `Score: ${getScore()}`;
    if (getScore() >= 5) {
      endGame(true);
      return;
    }
    loadNewCountry();
  } else {
    incrementWrongAnswers();
    document.querySelector(
      '#wrong-answers'
    ).innerHTML = `Wrong Answers: ${getWrongAnswers()}`;
    if (getWrongAnswers() >= 3) {
      endGame(false);
      return;
    }

    const correctAnswerMessage = document.getElementById(
      'correctAnswerMessage'
    );
    correctAnswerMessage.textContent = `The correct answer was ${correctAnswer}.`;
    correctAnswerMessage.style.display = 'block';

    setTimeout(() => {
      correctAnswerMessage.style.display = 'none';
      loadNewCountry();
    }, 2000);
  }
};

const loadNewCountry = () => {
  const selectedCountryIndex = Math.floor(Math.random() * countries.length);
  const newCountryCode = countries[selectedCountryIndex].cca2;
  displayCountryInfo(newCountryCode);
};

const endGame = isWin => {
  const modal = document.getElementById('endGameModal');
  const modalMessage = document.getElementById('modalMessage');
  const playAgainButton = document.getElementById('playAgain');

  modalMessage.textContent = isWin
    ? 'Congratulations! You won!'
    : `Game over! The correct answer was ${selectedCountry}.`;

  modal.style.display = 'flex';

  playAgainButton.onclick = () => {
    resetGame();
    modal.style.display = 'none';
    initCountriesAPI();
  };

  document.getElementById('closeModal').onclick = () => {
    modal.style.display = 'none';
  };
};

window.initMap = initMap;

initCountriesAPI();

document.querySelector('#inputs').addEventListener('change', event => {
  handleUserResponse(event.target, selectedCountry);
});
