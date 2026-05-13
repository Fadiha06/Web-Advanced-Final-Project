let allEpisodes = [];

async function loadEpisodes() {
  let results = [];
  let nextUrl = "https://rickandmortyapi.com/api/episode";

  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();
    results = results.concat(data.results);
    nextUrl = data.info.next;
  }

  allEpisodes = results;
  renderEpisodes();
}

function renderEpisodes() {
  const search = document.getElementById("search").value.toLowerCase();
  const season = document.getElementById("filter-season").value;
  const sort = document.getElementById("sort").value;

  let filtered = allEpisodes.filter(ep => {
    return (
      ep.name.toLowerCase().includes(search) &&
      (season === "" || ep.episode.startsWith(season))
    );
  });

  if (sort === "id-asc") filtered.sort((a, b) => a.id - b.id);
  if (sort === "id-desc") filtered.sort((a, b) => b.id - a.id);
  if (sort === "name-asc") filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "name-desc") filtered.sort((a, b) => b.name.localeCompare(a.name));

  const table = document.getElementById("episodes-table");
  table.innerHTML = "";

  const watched = JSON.parse(localStorage.getItem("watched")) || [];

  if (filtered.length === 0) {
    table.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px;">Geen episodes gevonden.</td></tr>`;
    return;
  }

  filtered.forEach(ep => {
    const isWatched = watched.includes(ep.id);
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${ep.id}</td>
      <td>${ep.episode}</td>
      <td>${ep.name}</td>
      <td>${ep.air_date}</td>
      <td>${ep.created.substring(0, 10)}</td>
      <td>${ep.characters.length} characters</td>
      <td>
        <button class="watch-btn ${isWatched ? 'active' : ''}" data-id="${ep.id}">
          ${isWatched ? "✔" : "○"}
        </button>
      </td>
    `;

    row.querySelector(".watch-btn").addEventListener("click", () => {
      toggleWatched(ep.id);
      renderEpisodes();
    });

    table.appendChild(row);
  });
}

function toggleWatched(id) {
  let watched = JSON.parse(localStorage.getItem("watched")) || [];
  const exists = watched.includes(id);
  if (exists) {
    watched = watched.filter(w => w !== id);
  } else {
    watched.push(id);
  }
  localStorage.setItem("watched", JSON.stringify(watched));
}

document.getElementById("search").addEventListener("input", renderEpisodes);
document.getElementById("filter-season").addEventListener("change", renderEpisodes);
document.getElementById("sort").addEventListener("change", renderEpisodes);

loadEpisodes();