Rick & Morty App 🛸
Een interactieve webapplicatie gebouwd met de Rick and Morty API. Je kan personages en afleveringen bekijken, filteren, sorteren en bijhouden in je eigen collectie. Het project is gebouwd als eindwerk voor het vak Advanced Web.

 Screenshots
Personages paginA
## 📸 Screenshots

Hier zie je hoe de app eruitziet:


![Personages](web_advanced_project\src\assets\personage.png)
![Afleveringen](web_advanced_project\src\assets\aflevering.png)
![Favorieten](web_advanced_project\src\assets\Favorieten.png)
![Gekeken](web_advanced_project\src\assets\Watched.png)


 Functionaliteiten
Personages
Alle personages worden opgehaald via de Rick and Morty API en getoond in een kaartweergave. Elke kaart toont de foto, naam, soort, origine, laatste locatie en het aantal afleveringen waarin het personage voorkomt. Door op een kaart te klikken opent er een detailvenster met extra info.
Zoeken, filteren en sorteren
Bovenaan de personagepagina staan meerdere filters naast elkaar:
•	Zoeken op naam via een tekstveld
•	Filteren op status: Levend, Dood of Onbekend
•	Filteren op soort: Mens, Alien, Humanoïde, Robot, Dier, Mythologisch wezen, Ziekte, Cronenberg of Onbekend
•	Sorteren op naam (A-Z of Z-A) of op ID (oplopend of aflopend)
Favorieten
Op elke karakterkaart staat een hartje. Door erop te klikken voeg je het personage toe aan je favorieten. De favorieten worden opgeslagen via LocalStorage zodat ze bewaard blijven na het herladen. Op de favorieten-pagina zie je een tabel met foto, naam, status, soort en geslacht. Je kan favorieten ook terug verwijderen via de verwijderknop.
Afleveringen
Op de afleveringen-pagina zie je een overzicht van alle afleveringen in een tabel met code, naam en uitzenddatum. Je kan zoeken op naam of aflevering-code. Per aflevering kan je klikken op "Bekeken" om hem toe te voegen aan je kijkgeschiedenis. De knop verandert dan naar "Ongedaan maken".
Gekeken afleveringen
Op de gekeken-pagina zie je een overzicht van alle afleveringen die je als bekeken hebt gemarkeerd. Je kan ze één voor één verwijderen via de verwijderknop. Deze lijst wordt ook opgeslagen via LocalStorage.
Dark & Light mode
Rechtsboven in de navigatie staat een knop om te wisselen tussen dark en light mode. Je voorkeur wordt opgeslagen via LocalStorage zodat die bewaard blijft na het herladen.

Gebruikte API
Ik gebruik de gratis Rick and Morty API:
Endpoint	Gebruik
/api/character	Alle personages ophalen (826 personages, meerdere pagina's)
/api/episode	Alle afleveringen ophalen

 Installatie
bash
# 1. Clone de repository
git clone https://github.com/Fadiha06/Web-Advanced-Final-Project

# 2. Ga naar de map
cd web_advanced_project

# 3. Installeer de dependencies
npm install

# 4. Start de app
npm run dev
Daarna open je http://localhost:5173 in je browser.

Folderstructuur
project/
├── index.html
├── src/
│   ├── script-characters.js   # Personages ophalen, filteren en renderen
│   ├── script-episodes.js     # Afleveringen ophalen en weergeven
│   ├── script-favorite.js     # Favorieten opslaan en verwijderen
│   ├── script-gekeken.js      # Kijkgeschiedenis beheren
│   ├── script-main.js         # Navigatie en modal
│   ├── theme.js               # Dark/light mode
│   └── style.css              # Alle stijlen
├── dist/
└── package.json






DOM Manipulatie

Elementen selecteren — Op lijn 2-6 selecteer ik de zoekbalk, filters en de container waar de kaarten in komen
Elementen manipuleren — Op lijn 55 leeg ik de container bij elke nieuwe render. Op lijn 61 maak ik kaarten zichtbaar via een animatie
Events koppelen — Op lijn 90 en 96 reageert de app op klikken op een kaart of het hartje. Op lijn 145 reageert de zoekbalk op wat de gebruiker typt


 Modern JavaScript

const — Op lijn 2-6 gebruik ik const voor alle variabelen die niet veranderen
Template literals — Op lijn 70-88 bouw ik de HTML van elke kaart op met variabelen zoals de naam, foto en locatie van het personage
forEach / iteratie — Op lijn 66 loop ik over alle personages om er een kaart van te maken
Array methodes — Op lijn 118-124 gebruik ik .filter() om te zoeken en filteren. Op lijn 128-131 gebruik ik .sort() om te sorteren
Arrow functions — Overal in de code gebruik ik arrow functions zoals (ch) => {} en (a, b) => {}
Ternary operator — Op lijn 85 gebruik ik isFav ? '❤️' : '🤍' om het juiste hartje te tonen
Callback functions — Op lijn 59 en 66 geef ik een callback mee aan forEach en filter
Promise — Op lijn 11-18 gebruik ik new Promise(...) in de functie fetchPagePromise
Async & Await — Op lijn 20-30 haal ik alle personages op via async/await in een while-loop die alle pagina's doorloopt
IntersectionObserver — Op lijn 58-64 gebruik ik een Observer die kaarten een animatie geeft wanneer ze in beeld komen


 Data & API

Fetch — Op lijn 24 haal ik de data op van de Rick and Morty API. Omdat de API meerdere pagina's heeft, blijf ik ophalen tot er geen volgende pagina meer is
JSON verwerken — Op lijn 25 zet ik de API response om naar bruikbare data. Op lijn 33 en 51 sla ik data op en lees ik die terug uit via LocalStorage


 Opslag & Validatie

Formuliervalidatie — Op lijn 145-153 controleer ik de zoekbalk. Als de gebruiker maar 1 karakter typt wordt de rand rood, anders groen
LocalStorage — Op lijn 33 en 51 worden favorieten opgeslagen en opgehaald. In theme.js wordt de themavoorkeur opgeslagen en in script-gekeken.js de kijkgeschiedenis


 Styling & Layout

CSS Grid — De personages worden getoond in een grid van 6 kolommen via grid-template-columns: repeat(6, 1fr)
Flexbox — De navigatie, filterrij en kaartinhoud zijn opgebouwd met flexbox
Responsive design — Via media queries past het grid zich aan: 4 kolommen op tablet, 2 op klein scherm en 1 op mobiel
Gebruiksvriendelijke elementen — Hartjesknop voor favorieten, verwijderknoppen in de tabellen, themaknop rechtsboven en hover effecten op kaarten


 Tooling

Vite — Het project is opgezet met Vite als bundler
Folderstructuur — HTML, CSS en JS staan in aparte bestanden onder de src map. De gebouwde versie staat in dist

 Bronnen
•	https://rickandmortyapi.com/documentation
•	MDN — (https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
•	MDN — https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
•	MDN — https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
•	MDN — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
•	AI chatlog: https://mammouth.ai/shared/bf6af59b-19ac-47a8-b95b-74478d635231
