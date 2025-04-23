// Header for show containers
let subheader = document.createElement("div");

function formShowContainers(shows, moviesAndTheirStartTimes) {
  // Keeps track of already added movies
  let alreadyAddedMovies = [];
  for (let show of shows) {
    // Execute if you come across an unseen EventID
    // I.e. a new movie
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
      ogTitle.innerText = show.querySelector("OriginalTitle").textContent;
      ogTitle.style.display = "inline";

      firstRow.append(title);
      // Append only if title and original title differ from each other
      if (title.innerText.localeCompare(ogTitle.innerText) != 0) {
        ogTitle.innerText = " (" + ogTitle.innerText + ")";
        firstRow.append(ogTitle);
      }

      if ("a".localeCompare("a") != 0) console.log("ASD");

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

      content.append(showContainer);

      // Push EventID into alreadyAddedMovies
      // (i.e. keep track of already added movies)
      alreadyAddedMovies.push(show.querySelector("EventID").textContent);
    }
  }
}

// Displays shows on webpage
function displayShows(data) {
  // Contains all shows
  // (i.e. every screening for every movie on present day)
  let shows = data.querySelectorAll("Show");

  // Add text to subheader
  subheader.innerHTML = "<h2>Seuraavat näytökset:</h2><br />";
  subheader.style.textAlign = "center";
  content.append(subheader);

  // Will contain key-value pairs
  // Keys will be EventID's (i.e. ID's for every DISTINCT MOVIE),
  // values will be dttmShowStarts (i.e. movie screening start times)
  // {
  //   movie01: [startTime01],
  //   movie02: [startTime01, startTime02],
  //   movie03: [startTime01, startTime02, startTime03]
  // }
  let moviesAndTheirStartTimes = {};
  // Gather all different movies (i.e. movies that run in chosen theatre on present day)
  // and their screening start times in an object
  // The point here is to form a list of all DIFFERENT MOVIES running on present day
  // Finnkino API's don't provide an endpoint which lists distinct movies, only
  for (let show of shows) {
    let eventID = show.querySelector("EventID").textContent;
    // Trim the first 11 and the last 2 characters from the dates
    let startTime = show
      .querySelector("dttmShowStart")
      .textContent.slice(11, 16);
    // Execute if moviesAndTheirStartTimes doesn't already include specific EventID as key
    if (!(eventID in moviesAndTheirStartTimes)) {
      // Set EventID as key, and dttmShowStart as value (wrap in array)
      moviesAndTheirStartTimes[eventID] = [startTime];
      // If moviesAndTheirStartTimes already includes specific EventID as key
    } else {
      // Push dttmShowStart into array
      moviesAndTheirStartTimes[eventID].push(startTime);
    }
  }

  formShowContainers(shows, moviesAndTheirStartTimes);
}
