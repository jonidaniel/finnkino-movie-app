// MOVIES OPERATIONS

// A header for show containers
// Is global so that it's visible in ./click-and-fetch.js
// (it's removed from the screen there)
let subheader = document.createElement("div");

/* Displays the movie containers
 *
 * There's one movie container for every movie
 * A movie container contains a movie image, title, possible original title,
 * production year, length, genres, theatre and auditorium,
 * presentation method and language, and also the movie's show times
 *
 * Movie image takes the left side of the container,
 * all other info is shown on the right side
 * The right side consists of 5 rows:
 * 1. title, original title
 * 2. prod. year, length
 * 3. genres
 * 4. theatre and audit., pres. method and lang.
 * 5. show times
 *
 * Params:
 * movies, object - contains all movies and their properties
 */
function displayMovieContainers(movies) {
  // Add text to subheader
  // This mustn't be global, this way it works correctly
  subheader.innerHTML = "<h2>Seuraavat näytökset:</h2><br />";
  subheader.style.textAlign = "center";
  content.append(subheader);

  // Iterate all movies
  // Set one movie in its container per iteration
  for (movie in movies) {
    // A container to wrap one movie and its info into
    let movieContainer = document.createElement("div");
    movieContainer.className = "movieContainer";

    // Contains title and possible original title
    let firstRow = document.createElement("p");
    // Contains production year and length
    let secondRow = document.createElement("p");
    // Contains location (i.e. theatre and auditorium), presentation method and language
    let fourthRow = document.createElement("p");

    // Append all movie properties to movieContainer
    // (or first to firstRow, secondRow and fourthRow,
    // and then to movieContainer)
    movieContainer.append(movies[movie].image);
    firstRow.append(movies[movie].title);
    // Append ogTitle only if it differs from title
    if (
      movies[movie].title.innerText.localeCompare(
        movies[movie].ogTitle.innerText
      ) != 0
    ) {
      movies[movie].ogTitle.innerText =
        " (" + movies[movie].ogTitle.innerText + ")";
      firstRow.append(movies[movie].ogTitle.innerText);
    }
    movieContainer.append(firstRow);
    secondRow.append(movies[movie].year.innerText + ", ");
    secondRow.append(movies[movie].length.innerText + " min");
    movieContainer.append(secondRow);
    movieContainer.append(movies[movie].genres);
    fourthRow.append(movies[movie].location.innerText + "; ");
    fourthRow.append(movies[movie].presMethodAndLang);
    movieContainer.append(fourthRow);

    // Create show times
    let showTimes = document.createElement("p");
    showTimes.innerText = "Näytösajat tänään: ";
    // Format show times so that they look nice
    // (i.e. add commas where needed)
    for (let i = 0; i < movies[movie].showTimes.length; i++) {
      if (i != movies[movie].showTimes.length - 1) {
        showTimes.innerText += movies[movie].showTimes[i] + ", ";
      } else {
        showTimes.innerText += movies[movie].showTimes[i];
      }
    }
    // Append show times string to movieContainer
    movieContainer.append(showTimes);

    // Append movieContainer to webpage content
    content.append(movieContainer);
  }
}

/* Gathers all different movies (i.e. distinct movies that run in chosen theatre on present day)
 * and all relevant movie info in an object
 *
 * Finnkino's API's don't provide an endpoint which would list DISTINCT movies conveniently,
 * they do provide an endpoint which lists ALL SHOWS (not ordered by movie) in chronological order
 * We want to display every movie ONLY ONCE on the webpage,
 * with all show start times adjacent to the movie image and title
 * This is why we need this function
 *
 * Params:
 * data, document - contains all shows, i.e. every screening for every movie on present day
 */
function formMoviesObject(data) {
  /* Will contain key-value pairs
   * Keys will be EventID's (i.e. ID's for every distinct movie),
   * values will be the movie properties we want to display on the webpage
   *
   * {
   *   movie01: {
   *              image: string,
   *              title: string,
   *              ogTitle: string,
   *              year: number,
   *              length: number,
   *              genres: string,
   *              location: string,
   *              presMethodAndLang: string,
   *              showTimes: [
   *                           string,
   *                           string,
   *                           string
   *                         ]
   *            },
   *   movie02: {
   *              ...
   * }
   */
  let movies = {};

  // Contains all shows
  // (i.e. every screening for every movie on present day)
  const shows = data.querySelectorAll("Show");
  // Iterate all shows and fill movies object
  for (let show of shows) {
    // EventID's are Finnkino's numeric identifications for movies
    // Every movie has a distinct ID
    let eventID = show.querySelector("EventID").textContent;

    // Save needed properties to variables
    // Execute if an EventID isn't already added
    // (i.e. add every property, not only show time)
    if (!(eventID in movies)) {
      // Image
      const image = document.createElement("img");
      image.src = show
        .querySelector("Images")
        .querySelector("EventLargeImagePortrait").textContent;
      image.height = 350;

      // Title
      const title = document.createElement("p");
      title.innerText = show.querySelector("Title").textContent;
      title.style.display = "inline";

      // Original title
      const ogTitle = document.createElement("p");
      ogTitle.innerText = show.querySelector("OriginalTitle").textContent;

      // Production year
      const year = document.createElement("p");
      year.innerText = show.querySelector("ProductionYear").textContent;
      year.style.display = "inline";

      // Length
      const length = document.createElement("p");
      length.innerText = show.querySelector("LengthInMinutes").textContent;
      length.style.display = "inline";

      // Genres
      const genres = document.createElement("p");
      genres.innerText = show.querySelector("Genres").textContent;

      // Location
      const location = document.createElement("p");
      location.innerText = show.querySelector(
        "TheatreAndAuditorium"
      ).textContent;
      location.style.display = "inline";

      // Presentation method and language
      const presMethodAndLang = document.createElement("p");
      presMethodAndLang.innerText = show.querySelector(
        "PresentationMethodAndLanguage"
      ).textContent;
      presMethodAndLang.style.display = "inline";

      // Show times
      // Trim the first 11 and the last 2 characters from all dates
      // (i.e. spare only the starting hours and minutes)
      const showTime = show
        .querySelector("dttmShowStart")
        .textContent.slice(11, 16);

      // Initialize movies[eventID] as an object, so we can assign it the keys we want
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
      // Add only the show start time
      // Execute if an EventID (i.e. movie) is already added
    } else {
      // Trim the first 11 and the last 2 characters from all dates
      // (i.e. spare only the starting hours and minutes)
      const showTime = show
        .querySelector("dttmShowStart")
        .textContent.slice(11, 16);
      movies[eventID].showTimes.push(showTime);
    }
  }

  // Go render the movie containers onto the webpage
  displayMovieContainers(movies);
}
