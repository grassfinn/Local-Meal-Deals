const currentDay = document.querySelector('#current-day');
const currentDeals = document.querySelector('#current-deals');
const buttons = document.querySelectorAll('button');
const foodBtn = document.querySelector('#food');
const drinksBtn = document.querySelector('#drinks');
const res = await fetch('deals.json');
const data = await res.json();

const today = getDate();

displayDay(today);

function getDate() {
  //? https://stackoverflow.com/questions/24998624/day-name-from-date-in-js
  const date = new Date();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const currentDay = days[date.getDay()];
  return currentDay;
}

function displayDay(day) {
  currentDay.textContent = day;
  getData();
}

async function getData() {
  const addresses = data.addresses;
  // display
  console.log(Object.entries(data.day[today]));
  const allDeals = [...Object.entries(data.day[today])];
  console.log(allDeals);
  Object.entries(data.day[today]).map((cDeal) => {
    const div = document.createElement('div');
    div.innerHTML = createCard(cDeal, addresses);
    currentDeals.append(div);
    return div;
  });
  return data;
}

buttons.forEach((button) => {
  button.addEventListener('click', filter);
});

function createCard(data, address) {
  const title = data[0];
  const deal = data[1];
  const cAddress = address[title];
  return `<div class="card">
  <h3 class="card-header">
  ${title}
  </h3>
  <div class="card-body">
  <blockquote class="blockquote mb-0">
  <p>${deal}</p>
  <footer class="blockquote-footer"><cite title="Source Title">${cAddress}</cite></footer>
  </blockquote>
  </div>
  </div>`;
}

//? https://www.javascripttutorial.net/javascript-dom/javascript-onload/
