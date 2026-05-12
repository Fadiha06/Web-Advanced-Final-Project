let allCharacters = [];

async function loadCharacters() {
  let results = [];
  let nextUrl = "https://rickandmortyapi.com/api/character";

  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();
    results = results.concat(data.results);
    nextUrl = data.info.next;
  }

  allCharacters = results.slice(0, 35);
  renderCharacters();
}

function renderCharacters() {
  const search = document.getElementById("search").value.toLowerCase();
  const status = document.getElementById("filter-status").value;
  const species = document.getElementById("filter-species").value;
  const gender = document.getElementById("filter-gender").value;
  const sort = document.getElementById("sort").value;

  let filtered = allCharacters.filter(char => {
    return (
      char.name.toLowerCase().includes(search) &&
      (status === "" || char.status === status) &&
      (species === "" || char.species === species) &&
      (gender === "" || char.gender === gender)
    );
  });

  if (sort === "id-asc") filtered.sort((a, b) => a.id - b.id);
  if (sort === "id-desc") filtered.sort((a, b) => b.id - a.id);
  if (sort === "name-asc") filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "name-desc") filtered.sort((a, b) => b.name.localeCompare(a.name));

  const container = document.getElementById("characters-container");
  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = `<p style="color:#aaa; margin: 2rem;">Geen characters gevonden.</p>`;
    return;
  }

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  filtered.forEach(char => {
    const isFav = favorites.some(f => f.id === char.id);
    const card = document.createElement("div");
    card.classList.add("character-card");

    card.innerHTML = `
      <div class="character-img-wrapper">
        <img src="${char.image}" alt="${char.name}">
        <button class="favorite-btn ${isFav ? 'active' : ''}" data-id="${char.id}">
          ${isFav ? "★" : "☆"}
        </button>
      </div>
      <div class="character-info">
        <h2>${char.name}</h2>
        <p class="char-status ${char.status.toLowerCase()}">● ${char.status}</p>
        <p>🧬 ${char.species}</p>
        <p>⚧ ${char.gender}</p>
        <p>📍 ${char.origin.name}</p>
      </div>
    `;

    card.querySelector(".favorite-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(char);
      renderCharacters();
    });

    card.addEventListener("click", () => openModal(char));

    container.appendChild(card);
  });
}

function openModal(char) {
  document.getElementById("modal-img").src = char.image;
  document.getElementById("modal-name").textContent = char.name;
  document.getElementById("modal-status").textContent = char.status;
  document.getElementById("modal-status").className = `char-status ${char.status.toLowerCase()}`;
  document.getElementById("modal-species").textContent = char.species;
  document.getElementById("modal-gender").textContent = char.gender;
  document.getElementById("modal-origin").textContent = char.origin.name;
  document.getElementById("modal-location").textContent = char.location.name;
  document.getElementById("modal-episodes").textContent = char.episode.length + " episodes";
  document.getElementById("modal").classList.add("active");
}

document.addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    document.getElementById("modal").classList.remove("active");
  }
});

function toggleFavorite(char) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const exists = favorites.some(f => f.id === char.id);

  if (exists) {
    favorites = favorites.filter(f => f.id !== char.id);
  } else {
    favorites.push({
      id: char.id,
      name: char.name,
      image: char.image,
      status: char.status,
      species: char.species,
      gender: char.gender,
      origin: char.origin.name
    });
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

document.getElementById("search").addEventListener("input", renderCharacters);
document.getElementById("filter-status").addEventListener("change", renderCharacters);
document.getElementById("filter-species").addEventListener("change", renderCharacters);
document.getElementById("filter-gender").addEventListener("change", renderCharacters);
document.getElementById("sort").addEventListener("change", renderCharacters);

loadCharacters();