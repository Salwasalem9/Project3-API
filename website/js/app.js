// API URL + KEY
const apiURL = `http://api.openweathermap.org/data/2.5/weather?units=metric`;
const apiKey = 'a701f103491f755785319cbca1cf5dad';

// Create a new date instance dynamically with JS
let date = new Date();
let showDate = date.getMonth() + 1 + "." + date.getDate() + "." + date.getFullYear();

// Event button
document.querySelector('#generate')
  .addEventListener('click', WeatherInfo);

function WeatherInfo() {
  const city = document.querySelector('#city').value;
  const feel = document.querySelector('#feelings').value;

  temperature(apiURL, city, apiKey).then(function (data) {
    WeatherData(`/storedata`, { temp: data.main.temp, date: showDate, userFeelings: feel,
    }).then(() => {
      updateUI();
    });
  });
}

//  OpenWeatherMap's  data
const temperature = async (apiURL, city, apiKey) => {
  const Res = await fetch(apiURL + '&q=' + city + '&appid=' + apiKey);
  console.log(Res);
  try {
    const DataUs = await Res.json();
    return DataUs;
  } catch (error) {
    console.log('error', error);
  }
};

// Post data 
const WeatherData = async (url = '', data = {}) => {
  const Req = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'Application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const Data2 = await Req.json();
    console.log(Data2);
    return Data2;
  } catch (error) {
    console.log('error', error);
  }
};

//user to see
const updateUI = async () => {
  const Req = await fetch(`/all`);
  try {
    const ContentData = await Req.json();
    document.getElementById('date').innerHTML = ContentData.date;
    document.getElementById('temp').innerHTML = `${ContentData.temp}°C`;
    document.getElementById('userFeelings').innerHTML = ContentData.userFeelings;
  } catch (error) {
    console.log('error', error);
  }
};