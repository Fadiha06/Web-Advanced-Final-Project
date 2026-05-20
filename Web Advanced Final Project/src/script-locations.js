let allLocations = [];

async function loadLocations() {
  const response = await fetch("https://rickandmortyapi.com/api/location");
  const data = await response.json();
  allLocations = data.results;
  renderLocations();
}

function renderLocations() {
  const search = document.getElementById("search").value.toLowerCase();
  const type = document.getElementById("filter-type").value;
  const sort = document.getElementById("sort").value;

  let filtered = allLocations.filter(loc => {
    return (
      loc.name.toLowerCase().includes(search) &&
      (type === "" || loc.type === type)
    );
  });

  if (sort === "id-asc") filtered.sort((a, b) => a.id - b.id);
  if (sort === "id-desc") filtered.sort((a, b) => b.id - a.id);
  if (sort === "name-asc") filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "name-desc") filtered.sort((a, b) => b.name.localeCompare(a.name));
  if (sort === "residents-desc") filtered.sort((a, b) => b.residents.length - a.residents.length);
  if (sort === "residents-asc") filtered.sort((a, b) => a.residents.length - b.residents.length);

  const container = document.getElementById("locations-container");
  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = `<p style="color:#aaa; margin: 2rem;">Geen locaties gevonden.</p>`;
    return;
  }

  filtered.forEach(loc => {
    const card = document.createElement("div");
    card.classList.add("location-card");

    card.innerHTML = `
      <div class="location-info">
        <h2>${loc.name}</h2>
        <p class="location-dimension">📍 ${loc.dimension}</p>
        <p class="location-type">🌀 ${loc.type}</p>
        <p class="location-residents">👥 ${loc.residents.length} residents</p>
      </div>
    `;

    container.appendChild(card);
  });
}

document.getElementById("search").addEventListener("input", renderLocations);
document.getElementById("filter-type").addEventListener("change", renderLocations);
document.getElementById("sort").addEventListener("change", renderLocations);

loadLocations();

function setupLazyLoading() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.1 });


  document.querySelectorAll(".location-card").forEach(card => {
    observer.observe(card);
  });
}


renderLocations();
setupLazyLoading(); 
