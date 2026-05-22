  function showPage(page) {
            // Verberg alle pagina's
            document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
            // Verwijder active van alle nav-links
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

            // Toon de juiste pagina en markeer de link
            document.getElementById('page-' + page).style.display = 'block';
            document.getElementById('nav-' + page).classList.add('active');

            // Herlaad dynamische content indien nodig
            if (page === 'favorites') {
                renderFavorites();
            }
            if (page === 'watched') {
                renderWatched();
            }
        }

        /* Modal functies */
        function openModal(character) {
            document.getElementById('modal-img').src = character.image;
            document.getElementById('modal-name').textContent = character.name;
            document.getElementById('modal-status').textContent = character.status;
            document.getElementById('modal-species').textContent = character.species;
            document.getElementById('modal-gender').textContent = character.gender;
            document.getElementById('modal-episodes').textContent = character.episode?.length || 'Onbekend';
            document.getElementById('modal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('modal').classList.remove('active');
        }

        // Sluit modal bij klik buiten content
        document.getElementById('modal').addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });