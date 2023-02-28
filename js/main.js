const question = document.querySelector('#question');
let countriesList = document.querySelector('#countries');
let selectedCountry,
  countries,
  score = 0,
  wrongAnswers = 0;

// Fetch Rest Countries API
const fetchRestApi = () => {
  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => initCountriesAPI(data))
    .catch(error => console.log('Error:', error));
};

// Initialize the REST Countries object
const initCountriesAPI = countriesData => {
  // Define countries
  countries = countriesData;
  let options = '';

  // Map through countries array
  countries.map(
    country =>
      (options += `<option value="${country.cca2}">${country.name.common}</option>`),
  );

  countriesList.innerHTML = options;
  // Chooses a country at random
  countriesList.selectedIndex = Math.floor(
    Math.random() * countriesList.length,
  );

  // Return the index of the selected value
  displayCountryInfo(countriesList[countriesList.selectedIndex].value);
};

// Country is chosen by its cca2
const displayCountryInfo = countryAlphaCode => {
  const countryData = countries.find(
    country => country.cca2 === countryAlphaCode,
  );

  selectedCountry = countryData.name.common;

  // Get HTML elements
  let flag = document.querySelector('#flag-container img');
  let population = document.querySelector('#population').innerHTML;
  let languages = document.querySelector('#languages').innerHTML;

  // Set elements
  flag.src = countryData.flags.png;
  population = countryData.population.toLocaleString('en-US');
  languages = Object.values(countryData.languages)
    .filter(l => l)
    .map(l => `${l}`)
    .join(', ');
  // Get length of languages array for plural variable
  languagesLength = languages.split(' ').length;
  capital = countryData.capital;
  subregion = countryData.subregion;
  latLng = countryData.latlng;

  // Set plural
  const plural = languagesLength === 1 ? '' : 's';
  const singularPlural = languagesLength === 1 ? 'is' : 'are';

  // Generate a question
  question.innerHTML = `I am located in ${countryData.subregion}. ${languages} ${singularPlural} my native language${plural}. ${countryData.capital} is my capital city. My population is ${population}. What's my name?`;

  // Initialize the map and generate the answer radio buttons
  initMap(countryData);
  generateAnswers(countryData, countries);
};

// Creates answers based on the data from displayCountryInfo
const generateAnswers = (answer, allCountries) => {
  let wrongCountries = allCountries.filter(
    country => country.cca2 !== answer.cca2,
  );

  const countOfAnswers = 7;
  const positionOfCorrectAnswer = Math.floor(Math.random() * countOfAnswers);
  const answers = [];
  // Set input nodes
  let $input = document.querySelector('#inputs');

  // Remove previous array of answers from Q&A
  for (let i = 0; i < $input.length; ) {
    $input.removeChild($input.childNodes[i]);
  }

  for (let i = 0; i < countOfAnswers; i++) {
    // Generate the correct answer radio button
    if (i === positionOfCorrectAnswer) {
      // Add the correct answer to the answers array
      answers.push(answer);
      // Creates radio buttons
      $input.innerHTML =
        $input.innerHTML +
        `<label class='answers'> <input id='choice${i}' name='countries' type='radio' onchange='handleUserResponse(this)' value='${answers[i].name.common}'/> ${answers[i].name.common}`;
    } else {
      // Generate the radio buttons for wrong answers
      let randomAnswer =
        wrongCountries[Math.floor(Math.random() * wrongCountries.length)];
      wrongCountries = wrongCountries.filter(
        country => country.cca2 !== randomAnswer.cca2,
      );
      // Add wrong answers to the answers array
      answers.push({
        name: randomAnswer.name.common,
        cca2: randomAnswer.cca2,
      });
      let input = document.querySelector('#inputs');
      input.innerHTML =
        input.innerHTML +
        `<label class='answers'> <input id='choice${i}' name='countries' type='radio' onchange='handleUserResponse(this)' value='${answers[i].name}'/> ${answers[i].name}`;
    }
  }
  return answers;
};

// Access Google Maps API
const initMap = country => {
  // Create a variable for latitude and longitude
  const myLatLng = new google.maps.LatLng(country.latlng[0], country.latlng[1]);

  // Instantiate map with mapOptions object
  const mapOptions = {
    center: myLatLng,
    zoom: 3,
    disableDefaultUI: true,
    mapTypeId: 'satellite',
    heading: 90,
    tilt: 45,
    rotateControl: true,
    //disable zoom
    gestureHandling: 'none',
    zoomControl: false,
  };
  // Create the map
  const map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Set a marker for the chosen country
  const marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
  });

  // Set marker
  marker.setMap(map);
};

// Accumulate or decrement points based on responses
const handleUserResponse = element => {
  // Score output
  const updateScore = document.querySelector('#score');
  const guesses = document.querySelector('#wrong-answers');
  const numToWin = document.querySelector('#num-to-win');
  const guessesLeft = document.querySelector('#guesses-left');

  // Sounds
  const correctAnswer = document.querySelector('#answer-right');
  const wrongAnswer = document.querySelector('#answer-wrong');
  const gameWin = document.querySelector('#game-win');
  const gameLoss = document.querySelector('#game-loss');

  // Game win/loss output
  const gameEnd = document.querySelector('#game-end');
  const containerMain = document.querySelector('#container-main');

  // Set plural
  const plural = score === 0 ? '' : 's';
  const plurality = wrongAnswers === 0 ? 'country' : 'countries';

  if (element.value === selectedCountry) {
    score++;
    correctAnswer.play();
    updateScore.innerHTML = `You have ${score} point${plural}.`;
    numToWin.innerHTML = `Get ${5 - score} more correct and you win.`;
    setTimeout(function () {
      fetchRestApi();
    }, 1000);
    // If score is 5, player wins the game
    if (score === 5) {
      gameWin.play();
      containerMain.style.display = 'none';
      gameEnd.innerHTML = '<h2>You won! You actually beat Map Attack?!!!</h2)';
      gameEnd.style.backgroundColor = '#5585b5';
      gameEnd.style.color = '#fff';
      setTimeout(function () {
        window.location.replace('index.html');
      }, 9500);
    }
  } else {
    // Increment wrong answer counter
    wrongAnswers++;
    wrongAnswer.play();
    guesses.innerHTML = `You destroyed ${wrongAnswers} ${plurality}.`;
    question.innerHTML = `<h2>The correct answer is ${selectedCountry}.<h2>`;
    guessesLeft.innerHTML = `Get ${3 - wrongAnswers} more wrong and you lose.`;
    setTimeout(function () {
      fetchRestApi();
    }, 2000);
  }
  if (wrongAnswers === 3) {
    // If score is 3, player loses the game
    gameLoss.play();
    containerMain.style.display = 'none';
    gameEnd.innerHTML = '<h2>Map Attack beat you! Try again 😟<h2>';
    gameEnd.style.backgroundColor = '#f95959';
    setTimeout(function () {
      window.location.replace('index.html');
    }, 10000);
  }
};

fetchRestApi();
