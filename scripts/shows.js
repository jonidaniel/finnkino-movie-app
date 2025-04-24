/* A header for show containers
 * It's global so that it's visible in ./click-and-fetch.js
 * (it's removed from the screen there)
 */
let subheader = document.createElement("div");

/* Forms movie containers
 *
 * There's one movie container for every movie
 * A movie container contains a movie image, title, possible original title,
 * production year, length, genres, specific theatre and auditorium,
 * and the movie's presentation method and language
 *
 * Movie image takes the left side of the container,
 * all other info is shown on the right side
 * The right side consists of 5 rows:
 * 1. title, original title
 * 2. prod. year, length
 * 3. genres
 * 4. theatre, audit.
 * 5. pres. method, lang.
 *
 * Params:
 * shows - contains all shows, i.e. every screening for every movie on present day
 * moviesAndTheirStartTimes - contains all distinct movies and their start times
 */
// function formAndDisplayMovieContainers(shows, moviesAndTheirStartTimes) {
//   // Add text to subheader
//   // This mustn't be global, this way it works correctly
//   subheader.innerHTML = "<h2>Seuraavat näytökset:</h2><br />";
//   subheader.style.textAlign = "center";
//   content.append(subheader);

//   // Keeps track of already added movies
//   let alreadyAddedMovies = [];
//   // Iterate all shows
//   for (let show of shows) {
//     // Execute if you come across an unseen EventID
//     // I.e. a movie not yet added to the webpage
//     if (
//       !alreadyAddedMovies.includes(show.querySelector("EventID").textContent)
//     ) {
//       let firstRow = document.createElement("p");
//       let secondRow = document.createElement("p");
//       let fourthRow = document.createElement("p");

//       // Movie image
//       let image = document.createElement("img");
//       image.src = show
//         .querySelector("Images")
//         .querySelector("EventLargeImagePortrait").textContent;
//       image.height = 350;

//       // Movie title
//       let title = document.createElement("p");
//       title.innerText = show.querySelector("Title").textContent;
//       title.style.display = "inline";

//       // Original title
//       let ogTitle = document.createElement("p");
//       ogTitle.innerText = show.querySelector("OriginalTitle").textContent;
//       ogTitle.style.display = "inline";

//       firstRow.append(title);
//       // Append only if title and original title differ from each other
//       if (title.innerText.localeCompare(ogTitle.innerText) != 0) {
//         ogTitle.innerText = " (" + ogTitle.innerText + ")";
//         firstRow.append(ogTitle);
//       }

//       if ("a".localeCompare("a") != 0) console.log("ASD");

//       // Production year
//       let year = document.createElement("p");
//       year.innerText = show.querySelector("ProductionYear").textContent + ", ";
//       year.style.display = "inline";

//       // Movie length
//       let length = document.createElement("p");
//       length.innerText =
//         show.querySelector("LengthInMinutes").textContent + " min";
//       length.style.display = "inline";

//       secondRow.append(year);
//       secondRow.append(length);

//       // Movie genres
//       let genres = document.createElement("p");
//       genres.innerText = show.querySelector("Genres").textContent;

//       // Theatre and auditorium
//       let theatreAndAuditorium = document.createElement("p");
//       theatreAndAuditorium.innerText =
//         show.querySelector("TheatreAndAuditorium").textContent + "; ";
//       theatreAndAuditorium.style.display = "inline";

//       // Presentation method and language
//       let presentationMethodAndLanguage = document.createElement("p");
//       presentationMethodAndLanguage.innerText = show.querySelector(
//         "PresentationMethodAndLanguage"
//       ).textContent;
//       presentationMethodAndLanguage.style.display = "inline";

//       fourthRow.append(theatreAndAuditorium);
//       fourthRow.append(presentationMethodAndLanguage);

//       // Start times
//       let startTimes = document.createElement("p");
//       startTimes.innerText = "Näytösajat tänään: ";
//       for (time of moviesAndTheirStartTimes[
//         show.querySelector("EventID").textContent
//       ]) {
//         startTimes.innerText += time + ", ";
//       }
//       // Trim the last characters (, ) off of the start times string
//       startTimes.innerText = startTimes.innerText.substring(
//         0,
//         startTimes.innerText.length - 2
//       );

//       // A container to wrap one movie and its info into
//       let movieContainer = document.createElement("div");
//       movieContainer.className = "showContainer";

//       movieContainer.append(image);
//       movieContainer.append(firstRow);
//       movieContainer.append(secondRow);
//       movieContainer.append(genres);
//       movieContainer.append(theatreAndAuditorium);
//       movieContainer.append(presentationMethodAndLanguage);
//       movieContainer.append(startTimes);

//       content.append(movieContainer);

//       // Push EventID into alreadyAddedMovies
//       // (i.e. keep track of already added movies)
//       alreadyAddedMovies.push(show.querySelector("EventID").textContent);
//     }
//   }
// }
function formAndDisplayMovieContainers(movies) {
  // Add text to subheader
  // This mustn't be global, this way it works correctly
  subheader.innerHTML = "<h2>Seuraavat näytökset:</h2><br />";
  subheader.style.textAlign = "center";
  content.append(subheader);

  // // Start times
  // let startTimes = document.createElement("p");
  // startTimes.innerText = "Näytösajat tänään: ";
  // for (time of moviesAndTheirStartTimes[
  //   show.querySelector("EventID").textContent
  // ]) {
  //   startTimes.innerText += time + ", ";
  // }
  // // Trim the last characters (, ) off of the start times string
  // startTimes.innerText = startTimes.innerText.substring(
  //   0,
  //   startTimes.innerText.length - 2
  // );

  // Iterate all movies
  for (movie in movies) {
    // A container to wrap one movie and its info into
    let movieContainer = document.createElement("div");
    movieContainer.className = "movieContainer";

    movieContainer.append(movies[movie].image);
    let firstRow = document.createElement("p");
    firstRow.append(movies[movie].title);

    // Append only if title and original title differ from each other
    if (
      movies[movie].title.innerText.localeCompare(
        movies[movie].ogTitle.innerText
      ) != 0
    ) {
      movies[movie].ogTitle.innerText =
        " (" + movies[movie].ogTitle.innerText + ")";
      firstRow.append(movies[movie].ogTitle.innerText);
    }
    // firstRow.append(movies[movie].ogTitle);
    movieContainer.append(firstRow);
    let secondRow = document.createElement("p");
    secondRow.append(movies[movie].year);
    secondRow.append(movies[movie].length);
    movieContainer.append(secondRow);
    movieContainer.append(movies[movie].genres);
    let fourthRow = document.createElement("p");
    fourthRow.append(movies[movie].location);
    fourthRow.append(movies[movie].presMethodAndLang);
    movieContainer.append(fourthRow);
    movieContainer.append(movies[movie].showTimes);

    // Append movieContainer to webpage content
    content.append(movieContainer);
  }
}

/* Gathers all different movies (i.e. distinct movies that run in chosen theatre on present day)
 * and their screening start times in an object
 *
 * Finnkino's API's don't provide an endpoint which would list DISTINCT movies conveniently,
 * they do provide an endpoint which lists ALL SHOWS in chronological order
 *
 * We want to display every movie ONLY ONCE on the webpage,
 * with all screening start times adjacent to the movie image and title
 * This is why we need this function
 *
 * Params:
 * data - contains all shows, i.e. every screening for every movie on present day
 */
function gatherMoviesAndTheirStartTimes(data) {
  /* Will contain key-value pairs
   * Keys will be EventID's (i.e. ID's for every distinct movie),
   * values will be dttmShowStart's (i.e. movie screening start times)
   * {
   *   movie01: [startTime01],
   *   movie02: [startTime01, startTime02],
   *   movie03: [startTime01, startTime02, startTime03]
   *   ...
   * }
   */
  // let moviesAndTheirStartTimes = {};

  // let shows = data.querySelectorAll("Show");
  // // Iterate all shows and fill moviesAndTheirStartTimes
  // for (let show of shows) {
  //   // Trim the first 11 and the last 2 characters from all dates
  //   // I.e. spare only the starting hours and minutes
  //   let startTime = show
  //     .querySelector("dttmShowStart")
  //     .textContent.slice(11, 16);

  //   // EventID's are Finnkino's numeric identifications for movies
  //   // Every movie has a distinct ID
  //   let eventID = show.querySelector("EventID").textContent;
  //   // Execute if moviesAndTheirStartTimes doesn't already include specific EventID as key
  //   // I.e. if adding the first start time for a movie
  //   if (!(eventID in moviesAndTheirStartTimes)) {
  //     // Set EventID as key, and dttmShowStart as value (wrap in array)
  //     moviesAndTheirStartTimes[eventID] = [startTime];
  //     // If moviesAndTheirStartTimes already includes specific EventID as key
  //     // I.e. if there are already at least one start time for a movie
  //   } else {
  //     // Push dttmShowStart into array
  //     moviesAndTheirStartTimes[eventID].push(startTime);
  //   }
  // }

  /* {
   *   movie01: {
   *              image: "asd",
   *              title: "asd",
   *              ogTitle: "asd",
   *              year: 123,
   *              length: 123,
   *              genres: "asd",
   *              location: "asd",
   *              presMethodAndLang: "asd",
   *              showTimes: [
   *                           "10.00",
   *                           "11.00",
   *                           "21.00"
   *                         ]
   *            },
   *   movie02: {
   *              ...
   * }
   */

  let movies = {};

  let shows = data.querySelectorAll("Show");
  // Iterate all shows
  for (let show of shows) {
    // Distinct ID identifying a movie
    let eventID = show.querySelector("EventID").textContent;

    if (!(eventID in movies)) {
      // Save needed properties to variables
      const image = document.createElement("img");
      image.src = show
        .querySelector("Images")
        .querySelector("EventLargeImagePortrait").textContent;
      image.height = 350;
      const title = document.createElement("p");
      title.innerText = show.querySelector("Title").textContent;
      title.style.display = "inline";
      const ogTitle = document.createElement("p");
      ogTitle.innerText = show.querySelector("OriginalTitle").textContent;
      const year = document.createElement("p");
      year.innerText = show.querySelector("ProductionYear").textContent;
      year.style.display = "inline";
      const length = document.createElement("p");
      length.innerText = show.querySelector("LengthInMinutes").textContent;
      length.style.display = "inline";
      const genres = document.createElement("p");
      genres.innerText = show.querySelector("Genres").textContent;
      const location = document.createElement("p");
      location.innerText = show.querySelector(
        "TheatreAndAuditorium"
      ).textContent;
      location.style.display = "inline";
      const presMethodAndLang = document.createElement("p");
      presMethodAndLang.innerText = show.querySelector(
        "PresentationMethodAndLanguage"
      ).textContent;
      presMethodAndLang.style.display = "inline";
      const showTime = show
        .querySelector("dttmShowStart")
        .textContent.slice(11, 16);

      movies[eventID] = {};

      // Assign keys to movies[eventID]
      Object.assign(movies[eventID], {
        image: image,
        title: title,
        ogTitle: ogTitle,
        year: year,
        length: length,
        genres: genres,
        location: location,
        presMethodAndLang: presMethodAndLang,
        showTimes: [showTime],
      });
    } else {
      const showTime = show
        .querySelector("dttmShowStart")
        .textContent.slice(11, 16);
      movies[eventID].showTimes.push(showTime);
    }
  }

  formAndDisplayMovieContainers(movies);
}
