async function loadGekeken() {
  const watched = JSON.parse(localStorage.getItem("watched")) || [];
  const table = document.getElementById("gekeken-table");
  table.innerHTML = "";

  if (watched.length === 0) {
    table.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 20px;">Nog geen episodes gekeken.</td></tr>`;
    return;
  }

  const response = await fetch("https://rickandmortyapi.com/api/episode");
  const data = await response.json();

  const gekeken = data.results.filter(ep => watched.includes(ep.id));

  gekeken.forEach(ep => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${ep.id}</td>
      <td>${ep.episode}</td>
      <td>${ep.name}</td>
      <td>${ep.air_date}</td>
      <td>${ep.characters.length} characters</td>
      <td>
        <button class="watch-btn active" onclick="removeGekeken(${ep.id})">✖</button>
      </td>
    `;
    table.appendChild(row);
  });
}

function removeGekeken(id) {
  let watched = JSON.parse(localStorage.getItem("watched")) || [];
  watched = watched.filter(w => w !== id);
  localStorage.setItem("watched", JSON.stringify(watched));
  loadGekeken();
}

loadGekeken();