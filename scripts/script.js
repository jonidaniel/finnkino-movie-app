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

  if (e == "Espoo: OMENA") handleFetch(1039);
  else if (e == "Espoo: SELLO") handleFetch(1038);
  else if (e == "Helsinki: ITIS") handleFetch(1045);
  else if (e == "Helsinki: KINOPALATSI") handleFetch(1031);
  else if (e == "Helsinki: MAXIM") handleFetch(1032);
  else if (e == "Helsinki: TENNISPALATSI") handleFetch(1033);
  else if (e == "Vantaa: FLAMINGO") handleFetch(1013);
  else if (e == "Jyväskylä: FANTASIA") handleFetch(1015);
  else if (e == "Kuopio: SCALA") handleFetch(1016);
  else if (e == "Lahti: KUVAPALATSI") handleFetch(1017);
  else if (e == "Lappeenranta: STRAND") handleFetch(1041);
  else if (e == "Oulu: PLAZA") handleFetch(1018);
  else if (e == "Pori: PROMENADI") handleFetch(1019);
  else if (e == "Tampere: CINE ATLAS") handleFetch(1034);
  else if (e == "Tampere: PLEVNA") handleFetch(1035);
  else if (e == "Turku: KINOPALATSI") handleFetch(1022);
  else handleFetch(1046);
}

function main() {
  const header = document.createElement("div");
  const content = document.createElement("div");
  const footer = document.createElement("div");

  header.id = "header";
  content.id = "content";
  footer.id = "footer";

  header.innerHTML = "<h1>Finnkino Movie App</h1>";
  footer.innerHTML = "<h4>ⓒ 2025 Joni Mäkinen</h4>";

  document.body.append(header);
  document.body.append(content);
  document.body.append(footer);
}

main();
