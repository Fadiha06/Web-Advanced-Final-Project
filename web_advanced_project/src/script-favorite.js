function getFavorites() {
    return JSON.parse(localStorage.getItem('rm_favorites') || '[]');
}

function renderFavorites() {
    const tableBody = document.getElementById('favorites-table');
    if (!tableBody) return; // veilig als pagina niet geladen is

    const favorites = getFavorites();
    if (favorites.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Nog geen favorieten toegevoegd.</td></tr>';
        return;
    }

    tableBody.innerHTML = '';
    favorites.forEach(fav => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${fav.image}" alt="${fav.name}" width="50" style="border-radius:50%;"></td>
            <td>${fav.name}</td>
            <td>${fav.status}</td>
            <td>${fav.species}</td>
            <td>${fav.gender}</td>
            <td>
                <button class="action-btn remove-btn" data-id="${fav.id}">Verwijder</button>
            </td>
        `;
        tr.querySelector('button').addEventListener('click', () => {
            removeFavorite(fav.id);
        });
        tableBody.appendChild(tr);
    });
}

function removeFavorite(id) {
    let favorites = getFavorites();
    favorites = favorites.filter(f => f.id !== id);
    localStorage.setItem('rm_favorites', JSON.stringify(favorites));
    renderFavorites();
    // Update eventuele hartjes op de characters pagina (als die open is)
    if (typeof updateAllFavoriteButtons === 'function') {
        updateAllFavoriteButtons(); // optioneel, als je een functie maakt die alle knoppen bijwerkt
    }
}
