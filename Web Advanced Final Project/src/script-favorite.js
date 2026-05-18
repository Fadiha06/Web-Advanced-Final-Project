function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const table = document.getElementById("favorites-table");
  table.innerHTML = "";

  if (favorites.length === 0) {
    table.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 20px;">Geen favorieten gevonden.</td></tr>`;
    return;
  }

  favorites.forEach(char => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${char.id}</td>
      <td><img src="${char.image}" alt="${char.name}"></td>
      <td>${char.name}</td>
      <td>${char.status}</td>
      <td>${char.species}</td>
      <td>${char.gender}</td>
      <td>${char.origin}</td>
      <td>
        <button class="favorite-btn active" onclick="removeFavorite(${char.id})">★</button>
      </td>
    `;
    table.appendChild(row);
  });
}

function removeFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter(f => f.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  loadFavorites();
}

loadFavorites();