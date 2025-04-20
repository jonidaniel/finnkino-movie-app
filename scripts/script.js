// A container to wrap all movie containers into
let showContainers = document.createElement("div");
// A subheader for the movie containers (incoming shows)
let subheader = document.createElement("div");

function listShows(data) {
  // Contains all shows (i.e. every screening for every movie on present day)
  let shows = data.querySelectorAll("Show");

  // Add text to the subheader
  subheader.innerHTML = "<h2>Seuraavat näytökset:</h2><br />";
  subheader.style.textAlign = "center";
  content.append(subheader);

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
    // Trim the first 11 and the last 2 characters from the dates
    let startTime = show
      .querySelector("dttmShowStart")
      .textContent.slice(11, 16);
    // If moviesAndTheirStartTimes doesn't already include a specific EventID as a key
    if (!(eventID in moviesAndTheirStartTimes)) {
      // Set EventID as a key, and dttmShowStart as a value (wrap in an array)
      moviesAndTheirStartTimes[eventID] = [startTime];
      // If moviesAndTheirStartTimes already includes a specific EventID as a key
    } else {
      // Push dttmShowStart into an array
      moviesAndTheirStartTimes[eventID].push(startTime);
    }
  }

  // Keeps track of already added movies
  let alreadyAddedMovies = [];

  for (let show of shows) {
    // Execute if you come across an unseen EventID (i.e. a new movie)
    if (
      !alreadyAddedMovies.includes(show.querySelector("EventID").textContent)
    ) {
      let firstRow = document.createElement("p");
      let secondRow = document.createElement("p");
      let fourthRow = document.createElement("p");

      // Movie image
      let image = document.createElement("img");
      image.src = show
        .querySelector("Images")
        .querySelector("EventLargeImagePortrait").textContent;
      image.height = 350;

      // Movie title
      let title = document.createElement("p");
      title.innerText = show.querySelector("Title").textContent;
      title.style.display = "inline";

      // Original title
      let ogTitle = document.createElement("p");
      ogTitle.innerText =
        " (" + show.querySelector("OriginalTitle").textContent + ")";
      ogTitle.style.display = "inline";

      firstRow.append(title);
      if (title.innerText.localeCompare(ogTitle.innerText) != 0)
        firstRow.append(ogTitle);

      // Production year
      let year = document.createElement("p");
      year.innerText = show.querySelector("ProductionYear").textContent + ", ";
      year.style.display = "inline";

      // Movie length
      let length = document.createElement("p");
      length.innerText =
        show.querySelector("LengthInMinutes").textContent + " min";
      length.style.display = "inline";

      secondRow.append(year);
      secondRow.append(length);

      // Movie genres
      let genres = document.createElement("p");
      genres.innerText = show.querySelector("Genres").textContent;

      // Theatre and auditorium
      let theatreAndAuditorium = document.createElement("p");
      theatreAndAuditorium.innerText =
        show.querySelector("TheatreAndAuditorium").textContent + "; ";
      theatreAndAuditorium.style.display = "inline";

      // Presentation method and language
      let presentationMethodAndLanguage = document.createElement("p");
      presentationMethodAndLanguage.innerText = show.querySelector(
        "PresentationMethodAndLanguage"
      ).textContent;
      presentationMethodAndLanguage.style.display = "inline";

      fourthRow.append(theatreAndAuditorium);
      fourthRow.append(presentationMethodAndLanguage);

      // Start times
      let startTimes = document.createElement("p");
      startTimes.innerText = "Näytösajat tänään: ";
      for (time of moviesAndTheirStartTimes[
        show.querySelector("EventID").textContent
      ]) {
        startTimes.innerText += time + ", ";
      }
      // Trim the last characters (, ) off of the start times string
      startTimes.innerText = startTimes.innerText.substring(
        0,
        startTimes.innerText.length - 2
      );

      // A container to wrap one movie and its info into
      let showContainer = document.createElement("div");
      showContainer.className = "showContainer";

      showContainer.append(image);
      showContainer.append(firstRow);
      showContainer.append(secondRow);
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
  // Remove the subheader and all shows from the webpage (in case user changes the theatre)
  showContainers.innerHTML = "<div></div>";
  subheader.innerHTML = "<div></div>";

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
  else if (e == "Luxe Mylly, Raisio") handleFetch(1046);
}

function main() {
  const header = document.createElement("div");
  const searchBox = document.createElement("div");
  const content = document.createElement("div");
  content.id = "content";
  const footer = document.createElement("div");

  /** Webpage layout
   * 1. header
   * 2. search box
   * 3. movie results from search
   * 4. footer
   */
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
