let showContainers = document.createElement("div");

function listShows(data) {
  let shows = data.querySelectorAll("Show");

  for (let show of shows) {
    // Movie image
    let image = document.createElement("img");
    image.src = show
      .querySelector("Images")
      .querySelector("EventMediumImagePortrait").textContent;

    // Movie title
    let title = document.createElement("p");
    title.innerText = show.querySelector("Title").textContent;
    title.innerHTML += "<br />";

    // Original title
    let ogTitle = document.createElement("p");
    ogTitle.innerText = show.querySelector("OriginalTitle").textContent;
    ogTitle.innerHTML += "<br />";

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

    // Movie start time
    let movieStart = document.createElement("p");
    movieStart.innerText = show.querySelector("dttmShowStart").textContent;

    // Movie end time
    let movieEnd = document.createElement("p");
    movieEnd.innerText = show.querySelector("dttmShowEnd").textContent;

    // Ticket sales end time
    let salesEnd = document.createElement("p");
    salesEnd.innerText = show.querySelector("ShowSalesEndTime").textContent;

    // Reservation end time
    let reservationEnd = document.createElement("p");
    reservationEnd.innerText = show.querySelector(
      "ShowReservationEndTime"
    ).textContent;

    // Presentation method and language
    let presentationMethodAndLanguage = document.createElement("p");
    presentationMethodAndLanguage.innerText = show.querySelector(
      "PresentationMethodAndLanguage"
    ).textContent;

    let showContainer = document.createElement("div");
    showContainer.className = "showContainer";

    showContainer.append(image);
    showContainer.append(title);
    showContainer.append(ogTitle);
    showContainer.append(year);
    showContainer.append(length);
    showContainer.append(genres);
    showContainer.append(theatreAndAuditorium);
    showContainer.append(movieStart);
    showContainer.append(movieEnd);
    showContainer.append(salesEnd);
    showContainer.append(reservationEnd);
    showContainer.append(presentationMethodAndLanguage);

    showContainers.append(showContainer);
  }
  // console.log(showContainers);
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
  showContainers.innerHTML = "<div></div>";

  if (e.target.innerText == "Espoo: OMENA") handleFetch(1039);
  else if (e.target.innerText == "Espoo: SELLO") handleFetch(1038);
  else if (e.target.innerText == "Helsinki: ITIS") handleFetch(1045);
  else if (e.target.innerText == "Helsinki: KINOPALATSI") handleFetch(1031);
  else if (e.target.innerText == "Helsinki: MAXIM") handleFetch(1032);
  else if (e.target.innerText == "Helsinki: TENNISPALATSI") handleFetch(1033);
  else if (e.target.innerText == "Vantaa: FLAMINGO") handleFetch(1013);
  else if (e.target.innerText == "Jyväskylä: FANTASIA") handleFetch(1015);
  else if (e.target.innerText == "Kuopio: SCALA") handleFetch(1016);
  else if (e.target.innerText == "Lahti: KUVAPALATSI") handleFetch(1017);
  else if (e.target.innerText == "Lappeenranta: STRAND") handleFetch(1041);
  else if (e.target.innerText == "Oulu: PLAZA") handleFetch(1018);
  else if (e.target.innerText == "Pori: PROMENADI") handleFetch(1019);
  else if (e.target.innerText == "Tampere: CINE ATLAS") handleFetch(1034);
  else if (e.target.innerText == "Tampere: PLEVNA") handleFetch(1035);
  else if (e.target.innerText == "Turku: KINOPALATSI") handleFetch(1022);
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

  let theatres = [
    "Espoo: OMENA",
    "Espoo: SELLO",
    "Helsinki: ITIS",
    "Helsinki: KINOPALATSI",
    "Helsinki: MAXIM",
    "Helsinki: TENNISPALATSI",
    "Vantaa: FLAMINGO",
    "Jyväskylä: FANTASIA",
    "Kuopio: SCALA",
    "Lahti: KUVAPALATSI",
    "Lappeenranta: STRAND",
    "Oulu: PLAZA",
    "Pori: PROMENADI",
    "Tampere: CINE ATLAS",
    "Tampere: PLEVNA",
    "Turku: KINOPALATSI",
    "Raisio: LUXE MYLLY",
  ];

  let list = document.createElement("ul");
  for (let i = 0; i < theatres.length; i++) {
    let item = document.createElement("li");
    item.addEventListener("click", (e) => {
      handleClick(e);
    });
    item.innerHTML = theatres[i];
    list.appendChild(item);
  }

  content.append(list);

  document.body.append(header);
  document.body.append(content);
  document.body.append(footer);
}

main();
