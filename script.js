const cardsContainer = document.getElementById('heroCards');
const pageTitle = document.getElementById('pageTitle');
const pageSubtitle = document.getElementById('pageSubtitle');

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function renderCards() {
  cardsContainer.innerHTML = '';
  
  const searchQuery = getQueryParam('search')?.toLowerCase() || '';
  let filteredCars = cars;
  
  if (searchQuery) {
    filteredCars = cars.filter(car => 
      car.name.toLowerCase().includes(searchQuery) ||
      car.category.toLowerCase().includes(searchQuery) ||
      car.model.toLowerCase().includes(searchQuery)
    );
    
    if (pageTitle) pageTitle.textContent = `Search Results for "${getQueryParam('search')}"`;
    if (pageSubtitle) pageSubtitle.textContent = `Found ${filteredCars.length} vehicle${filteredCars.length !== 1 ? 's' : ''}`;
    
    if (filteredCars.length === 0) {
      cardsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #ccc; padding: 40px;">No vehicles found matching your search.</p>';
      return;
    }
  }

  filteredCars.forEach((car, index) => {
    const actualIndex = cars.indexOf(car);
    const card = document.createElement('article');
    card.className = 'car-card';
    card.dataset.car = actualIndex;
    card.innerHTML = `
      <div class="card-image ${car.cardImageClass}"></div>
      <div class="card-copy">
        <h3>${car.name}</h3>
      </div>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.car-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      window.location.href = `detail.html?id=${actualIndex}`;
    });

    cardsContainer.appendChild(card);
  });
}

renderCards();
