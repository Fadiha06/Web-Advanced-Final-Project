function getWatched() {
    return JSON.parse(localStorage.getItem('rm_watched') || '[]');
}

function renderWatched() {
    const tableBody = document.getElementById('watched-table');
    if (!tableBody) return;

    const watched = getWatched();
    if (watched.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Nog geen afleveringen bekeken.</td></tr>';
        return;
    }

    tableBody.innerHTML = '';
    watched.forEach(ep => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${ep.episode}</td>
            <td>${ep.name}</td>
            <td>${ep.air_date}</td>
            <td>
                <button class="action-btn remove-btn" data-id="${ep.id}">Verwijder</button>
            </td>
        `;
        tr.querySelector('button').addEventListener('click', () => {
            removeWatched(ep.id);
        });
        tableBody.appendChild(tr);
    });
}

function removeWatched(id) {
    let watched = getWatched();
    watched = watched.filter(w => w.id !== id);
    localStorage.setItem('rm_watched', JSON.stringify(watched));
    renderWatched();
    
}
