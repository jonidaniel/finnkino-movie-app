// A container to wrap all movie containers into
let showContainers = document.createElement("div");

function listShows(data) {
  // Contains all shows (i.e. every screening for every movie on present day)
  let shows = data.querySelectorAll("Show");

  // Will contain key-value pairs; keys will be EventID's (i.e. ID's for every distinct movie),
  // values will be dttmShowStarts (i.e. movie screening start times)
  let moviesAndTheirStartTimes = {};

  /** Gather all different movies (i.e. movies that run in chosen theatre on present day)
   *  and their screening/show start times in an object
   *  The point here is to form a list of all DIFFERENT MOVIES running on present day
   * {
   *   movie01: [startTime01],
   *   movie02: [startTime01, startTime02],
   *   movie03: [startTime01, startTime02, startTime03]
   * }
   */
  for (let show of shows) {
    let eventID = show.querySelector("EventID").textContent;
    // If moviesAndTheirStartTimes doesn't already include a specific EventID as a key
    if (!(eventID in moviesAndTheirStartTimes)) {
      // Set EventID as a key, and dttmShowStart as a value (wrap in an array)
      moviesAndTheirStartTimes[eventID] = [
        show.querySelector("dttmShowStart").textContent,
      ];
      // If moviesAndTheirStartTimes already includes a specific EventID as a key
    } else {
      // Push dttmShowStart into an array
      moviesAndTheirStartTimes[eventID].push(
        show.querySelector("dttmShowStart").textContent
      );
    }
  }

  // Keeps track of already added movies
  let alreadyAddedMovies = [];

  for (let show of shows) {
    // Execute if you come across an unseen EventID (i.e. a new movie)
    if (
      !alreadyAddedMovies.includes(show.querySelector("EventID").textContent)
    ) {
      // Movie image
      let image = document.createElement("img");
      image.src = show
        .querySelector("Images")
        .querySelector("EventLargeImagePortrait").textContent;
      image.height = 350;

      // Movie title
      let title = document.createElement("p");
      title.innerText = show.querySelector("Title").textContent;

      // Original title
      let ogTitle = document.createElement("p");
      ogTitle.innerText = show.querySelector("OriginalTitle").textContent;

      // Production year
      let year = document.createElement("p");
      year.innerText = show.querySelector("ProductionYear").textContent;

      // Movie length
      let length = document.createElement("p");
      length.innerText = show.querySelector("LengthInMinutes").textContent;

      // Movie genres
      let genres = document.createElement("p");
      genres.innerText = show.querySelector("Genres").textContent;

      // Theatre and auditorium
      let theatreAndAuditorium = document.createElement("p");
      theatreAndAuditorium.innerText = show.querySelector(
        "TheatreAndAuditorium"
      ).textContent;

      // Presentation method and language
      let presentationMethodAndLanguage = document.createElement("p");
      presentationMethodAndLanguage.innerText = show.querySelector(
        "PresentationMethodAndLanguage"
      ).textContent;

      // Start times
      let startTimes = document.createElement("p");
      startTimes.innerText =
        moviesAndTheirStartTimes[show.querySelector("EventID").textContent];

      // A container to wrap one movie and its info into
      let showContainer = document.createElement("div");
      showContainer.className = "showContainer";

      showContainer.append(image);
      showContainer.append(title);
      // Append original title only if it differs from title
      if (title.innerText.localeCompare(ogTitle.innerText) != 0)
        showContainer.append(ogTitle);
      showContainer.append(year);
      showContainer.append(length);
      showContainer.append(genres);
      showContainer.append(theatreAndAuditorium);
      showContainer.append(presentationMethodAndLanguage);
      showContainer.append(startTimes);

      showContainers.append(showContainer);

      // Push EventID into alreadyAddedMovies
      // (i.e. keep track of already added movies)
      alreadyAddedMovies.push(show.querySelector("EventID").textContent);
    }
  }

  // Append all show containers to the webpage
  content.append(showContainers);
}

function handleFetch(theatre) {
  fetch(`https://www.finnkino.fi/xml/Schedule/?area=${theatre}`)
    .then((response) => response.text())
    .then((xmlText) => new DOMParser().parseFromString(xmlText, "text/xml"))
    .then((xmlDoc) => {
      listShows(xmlDoc);
    })
    .catch((error) => console.error("Error when fetching XML feed: ", error));
}

function handleClick(e) {
  // Remove all shows from the webpage (in case user changes the theatre)
  showContainers.innerHTML = "<div></div>";

  if (e == "Omena, Espoo") handleFetch(1039);
  else if (e == "Sello, Espoo") handleFetch(1038);
  else if (e == "Itis, Helsinki") handleFetch(1045);
  else if (e == "Kinopalatsi, Helsinki") handleFetch(1031);
  else if (e == "Maxim, Helsinki") handleFetch(1032);
  else if (e == "Tennispalatsi, Helsinki") handleFetch(1033);
  else if (e == "Flamingo, Vantaa") handleFetch(1013);
  else if (e == "Fantasia, Jyväskylä") handleFetch(1015);
  else if (e == "Scala, Kuopio") handleFetch(1016);
  else if (e == "Kuvapalatsi, Lahti") handleFetch(1017);
  else if (e == "Strand, Lappeenranta") handleFetch(1041);
  else if (e == "Plaza, Oulu") handleFetch(1018);
  else if (e == "Promenadi, Pori") handleFetch(1019);
  else if (e == "Cine Atlas, Tampere") handleFetch(1034);
  else if (e == "Plevna, Tampere") handleFetch(1035);
  else if (e == "Kinopalatsi, Turku") handleFetch(1022);
  else handleFetch(1046);
}

function main() {
  const header = document.createElement("div");
  const searchBox = document.createElement("div");
  const content = document.createElement("div");
  const footer = document.createElement("div");

  content.id = "content";

  header.innerHTML = `<h1 id="header">Finnkino Elokuvat</h1>`;
  searchBox.innerHTML = `
    <div class="search-box">
      <div class="row">
        <input
          type="text"
          id="input-box"
          placeholder="Etsi elokuvateatteria..."
          autocomplete="off"
        />
        <button onclick="handleClick(document.getElementById('input-box').value)">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div class="result-box"></div>
    </div>
  `;
  footer.innerHTML = `<h4 id="footer">ⓒ 2025 Joni Mäkinen</h4>`;

  document.body.append(header);
  document.body.append(searchBox);
  document.body.append(content);
  document.body.append(footer);
}

main();
