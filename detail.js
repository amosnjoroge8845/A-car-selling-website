function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

const detailCategory = document.getElementById('detailCategory');
const detailName = document.getElementById('detailName');
const detailPrice = document.getElementById('detailPrice');
const detailYear = document.getElementById('detailYear');
const detailText = document.getElementById('detailText');
const detailHeroImage = document.getElementById('detailHeroImage');
const detailEngine = document.getElementById('detailEngine');
const detailPower = document.getElementById('detailPower');
const detailAcceleration = document.getElementById('detailAcceleration');
const detailTopSpeed = document.getElementById('detailTopSpeed');
const detailTransmission = document.getElementById('detailTransmission');
const detailFuelType = document.getElementById('detailFuelType');
const featureList = document.getElementById('featureList');

const selectedId = getQueryParam('id');
const carIndex = selectedId ? Number(selectedId) : 0;
const car = cars[carIndex] || cars[0];

detailCategory.textContent = car.category;
detailName.textContent = car.name;
detailPrice.textContent = car.price;
detailYear.textContent = car.year;
detailText.textContent = car.description;
detailHeroImage.className = `detail-hero-image ${car.heroImageClass}`;
detailEngine.textContent = car.engine;
detailPower.textContent = car.power;
detailAcceleration.textContent = car.acceleration;
detailTopSpeed.textContent = car.topSpeed;
detailTransmission.textContent = car.transmission;
detailFuelType.textContent = car.fuelType;

featureList.innerHTML = car.features
  .map(feature => `<li>${feature}</li>`)
  .join('');
