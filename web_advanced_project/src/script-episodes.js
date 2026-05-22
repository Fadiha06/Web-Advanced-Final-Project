(async function() {
    const tableBody = document.getElementById('episodes-table');
    const searchInput = document.getElementById('episode-search');

    let allEpisodes = [];

    async function fetchAllEpisodes() {
        let episodes = [];
        let url = 'https://rickandmortyapi.com/api/episode';
        while (url) {
            const res = await fetch(url);
            const data = await res.json();
            episodes = episodes.concat(data.results);
            url = data.info.next;
        }
        return episodes;
    }

    function renderEpisodes(list) {
        tableBody.innerHTML = '';
        list.forEach(ep => {
            const tr = document.createElement('tr');
            const watched = getWatched();
            const isWatched = watched.some(w => w.id === ep.id);
            tr.innerHTML = `
                <td>${ep.episode}</td>
                <td>${ep.name}</td>
                <td>${ep.air_date}</td>
                <td>
                    <button class="action-btn ${isWatched ? 'remove-btn' : ''}" data-id="${ep.id}">
                        ${isWatched ? 'Ongedaan maken' : 'Bekeken'}
                    </button>
                </td>
            `;
            tr.querySelector('button').addEventListener('click', (e) => {
                e.stopPropagation();
                toggleWatched(ep);
                renderEpisodes(filterEpisodes()); // her-render na verandering
            });
            tableBody.appendChild(tr);
        });
    }

    function getWatched() {
        return JSON.parse(localStorage.getItem('rm_watched') || '[]');
    }

    function toggleWatched(episode) {
        let watched = getWatched();
        const index = watched.findIndex(w => w.id === episode.id);
        if (index >= 0) {
            watched.splice(index, 1);
        } else {
            watched.push({
                id: episode.id,
                episode: episode.episode,
                name: episode.name,
                air_date: episode.air_date
            });
        }
        localStorage.setItem('rm_watched', JSON.stringify(watched));
    }

    function filterEpisodes() {
        const term = searchInput.value.toLowerCase();
        if (!term) return allEpisodes;
        return allEpisodes.filter(ep =>
            ep.name.toLowerCase().includes(term) ||
            ep.episode.toLowerCase().includes(term)
        );
    }

    // Initialiseer
    try {
        allEpisodes = await fetchAllEpisodes();
        renderEpisodes(allEpisodes);
    } catch (error) {
        tableBody.innerHTML = '<tr><td colspan="4">Fout bij ophalen van afleveringen.</td></tr>';
    }

    searchInput.addEventListener('input', () => {
        renderEpisodes(filterEpisodes());
    });
})();
