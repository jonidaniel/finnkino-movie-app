// CLICK AND FETCH OPERATIONS

/* Fetches show data as XML from Finnkino's API endpoint
 *
 * Forwards the parsed XML to formMoviesObject (located in ./shows.js)
 *
 * Params:
 * theatre, number – contains the theatre ID
 */
function handleFetch(theatre) {
  // AJAX request, using fetch
  fetch(`https://www.finnkino.fi/xml/Schedule/?area=${theatre}`)
    // Turn the response into XML text
    .then((response) => response.text())
    // Parse the XML text
    .then((xmlText) => new DOMParser().parseFromString(xmlText, "text/xml"))
    // The XML data is passed to formMoviesObject
    .then((xmlDoc) => {
      formMoviesObject(xmlDoc);
    })
    .catch((error) => console.error("Error when fetching XML feed: ", error));
}

/* Handles theatre searches (i.e. magnifying glass clicks)
 *
 * Passes specific theatre ID (dependent on user search) to handleFetch
 *
 * Params:
 * e, string – contains the search input box value
 */
function handleClick(e) {
  // Remove subheader and all shows from webpage
  // (in case user searches for another theatre)
  content.innerHTML = "<div></div>";
  subheader.innerHTML = "<div></div>";

  // Routing for different theatres
  // Distinct ID's are passed to handleFetch,
  // based on theatres searched
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
