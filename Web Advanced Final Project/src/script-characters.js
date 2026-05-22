(async function() {
    const container = document.getElementById('characters-container');
    const searchInput = document.getElementById('search');
    const statusFilter = document.getElementById('status-filter');
    const speciesFilter = document.getElementById('species-filter'); // NIEUW
    const sortSelect = document.getElementById('sort-order');

    let allCharacters = [];

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

    function renderCards(list) {
        container.innerHTML = '';
        list.forEach(ch => {
            const isFav = getFavorites().some(f => f.id === ch.id);
            const card = document.createElement('div');
            card.className = 'character-card';
            card.innerHTML = `
                <img src="${ch.image}" alt="${ch.name}">
                <div class="character-info">
                    <h2>${ch.name}</h2>
                    <p class="species">
                        <span class="status-dot ${ch.status.toLowerCase()}"></span>
                        ${ch.species}
                    </p>
                    <p class="label">Origin</p>
                    <p class="value">${ch.origin.name}</p>
                    <p class="label">Last location</p>
                    <p class="value">${ch.location.name}</p>
                    <p class="label">Appears on</p>
                    <p class="value">${ch.episode.length} chapters</p>
                    <button class="btn-fav ${isFav ? 'fav-active' : ''}" data-id="${ch.id}">
                        ${isFav ? '❤️' : '🤍'}
                    </button>
                </div>
            `;

            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('btn-fav')) {
                    openModal(ch);
                }
            });

            card.querySelector('.btn-fav').addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(ch.id, ch);
                const btn = e.target;
                const favs = getFavorites();
                const active = favs.some(f => f.id === ch.id);
                btn.classList.toggle('fav-active', active);
                btn.textContent = active ? '❤️' : '🤍';
            });

            container.appendChild(card);
        });
    }

    function filterAndSort() {
        let filtered = [...allCharacters];
        const searchTerm = searchInput.value.toLowerCase();
        const status = statusFilter.value;
        const species = speciesFilter.value; // NIEUW

        if (searchTerm) {
            filtered = filtered.filter(c => c.name.toLowerCase().includes(searchTerm));
        }
        if (status) {
            filtered = filtered.filter(c => c.status === status);
        }
        if (species) { // NIEUW
            filtered = filtered.filter(c => c.species === species);
        }

        switch (sortSelect.value) {
            case 'name-asc': filtered.sort((a,b) => a.name.localeCompare(b.name)); break;
            case 'name-desc': filtered.sort((a,b) => b.name.localeCompare(a.name)); break;
            case 'id-asc': filtered.sort((a,b) => a.id - b.id); break;
            case 'id-desc': filtered.sort((a,b) => b.id - a.id); break;
        }

        renderCards(filtered);
    }

    try {
        allCharacters = await fetchAllCharacters();
        renderCards(allCharacters);
    } catch (error) {
        container.innerHTML = '<p>Fout bij ophalen van personages.</p>';
    }

    searchInput.addEventListener('input', filterAndSort);
    statusFilter.addEventListener('change', filterAndSort);
    speciesFilter.addEventListener('change', filterAndSort); // NIEUW
    sortSelect.addEventListener('change', filterAndSort);
})();
