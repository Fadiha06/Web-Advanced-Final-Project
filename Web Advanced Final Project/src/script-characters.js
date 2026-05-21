(async function() {
    const container = document.getElementById('characters-container');
    const searchInput = document.getElementById('search');
    const statusFilter = document.getElementById('status-filter');
    const sortSelect = document.getElementById('sort-order');

    let allCharacters = [];

    // Fetch alle personages (let op: meerdere pagina's)
    async function fetchAllCharacters() {
        let characters = [];
        let url = 'https://rickandmortyapi.com/api/character';
        while (url) {
            const res = await fetch(url);
            const data = await res.json();
            characters = characters.concat(data.results);
            url = data.info.next;
        }
        return characters;
    }

    function renderCards(list) {
        container.innerHTML = '';
        list.forEach(ch => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${ch.image}" alt="${ch.name}">
                <div class="card-info">
                    <h3>${ch.name}</h3>
                    <p><span>Status:</span> ${ch.status}</p>
                    <p><span>Species:</span> ${ch.species}</p>
                    <p><span>Gender:</span> ${ch.gender}</p>
                    <button class="btn-fav" data-id="${ch.id}">❤️</button>
                </div>
            `;
            // Open modal bij klik op card, maar niet op de favorietknop
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('btn-fav')) {
                    openModal(ch);
                }
            });
            // Favoriet toevoegen/verwijderen
            card.querySelector('.btn-fav').addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(ch.id, ch);
                updateFavoriteButton(card.querySelector('.btn-fav'), ch.id);
            });
            // Update knop status
            updateFavoriteButton(card.querySelector('.btn-fav'), ch.id);
            container.appendChild(card);
        });
    }

    function updateFavoriteButton(btn, id) {
        const favorites = getFavorites();
        if (favorites.some(f => f.id === id)) {
            btn.classList.add('fav-active');
            btn.textContent = '❤️';
        } else {
            btn.classList.remove('fav-active');
            btn.textContent = '🤍';
        }
    }

    function getFavorites() {
        return JSON.parse(localStorage.getItem('rm_favorites') || '[]');
    }

    function toggleFavorite(id, character) {
        let favorites = getFavorites();
        const index = favorites.findIndex(f => f.id === id);
        if (index >= 0) {
            favorites.splice(index, 1);
        } else {
            favorites.push({
                id: character.id,
                name: character.name,
                image: character.image,
                status: character.status,
                species: character.species,
                gender: character.gender
            });
        }
        localStorage.setItem('rm_favorites', JSON.stringify(favorites));
    }

    function filterAndSort() {
        let filtered = [...allCharacters];
        const searchTerm = searchInput.value.toLowerCase();
        const status = statusFilter.value;

        if (searchTerm) {
            filtered = filtered.filter(c => c.name.toLowerCase().includes(searchTerm));
        }
        if (status) {
            filtered = filtered.filter(c => c.status === status);
        }

        const sortVal = sortSelect.value;
        switch (sortVal) {
            case 'name-asc':
                filtered.sort((a,b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filtered.sort((a,b) => b.name.localeCompare(a.name));
                break;
            case 'id-asc':
                filtered.sort((a,b) => a.id - b.id);
                break;
            case 'id-desc':
                filtered.sort((a,b) => b.id - a.id);
                break;
        }
        renderCards(filtered);
    }

    // Initialisatie
    try {
        allCharacters = await fetchAllCharacters();
        renderCards(allCharacters);
    } catch (error) {
        container.innerHTML = '<p>Fout bij ophalen van personages.</p>';
    }

    searchInput.addEventListener('input', filterAndSort);
    statusFilter.addEventListener('change', filterAndSort);
    sortSelect.addEventListener('change', filterAndSort);
})();
