function handleClick(content, buttonId) {
  let xhr = new XMLHttpRequest();

  let url = `https://swapi.dev/api/${buttonId}`;
  xhr.open("GET", url, true);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);

      let table = document.createElement("table");
      table.innerHTML += "<tr>";
      data.results.forEach((item) => {
        if (buttonId == "people")
          table.innerHTML += `<td>${item.name}, ${item.height}, ${item.mass}</td>`;
        else if (buttonId == "planets")
          table.innerHTML += `<td>${item.name}, ${item.diameter}, ${item.climate}</td>`;
        else if (buttonId == "films")
          table.innerHTML += `<td>${item.title}, ${item.episode_id}, ${item.director}</td>`;
        else if (buttonId == "species")
          table.innerHTML += `<td>${item.name}, ${item.classification}, ${item.average_height}</td>`;
        else if (buttonId == "vehicles")
          table.innerHTML += `<td>${item.name}, ${item.model}, ${item.length}</td>`;
        else
          table.innerHTML += `<td>${item.name}, ${item.model}, ${item.length}</td>`;
      });
      table.innerHTML += "</tr></table>";

      content.append(table);
    }
  };
}

function main() {
  // Play music
  // let mySound = new Audio("./sounds/star-wars-theme-song.mp3");
  // mySound.play();

  // Create an AJAX object (i.e. a request)
  let xhr = new XMLHttpRequest();

  // Create/open a connection
  let url = "https://swapi.dev/api";
  xhr.open("GET", url, true);
  // Send the request
  xhr.send();

  // Create a response handler
  // I.e. add a listener to the AJAX object
  // Is executed when the response arrives
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const header = document.createElement("img");
      const content = document.createElement("div");
      const footer = document.createElement("div");

      header.id = "header";
      header.src = "./images/star-wars-logo.png";
      header.alt = "Star Wars logo";
      header.width = 300;

      let data = JSON.parse(this.responseText);

      for (key in data) {
        let button = document.createElement("button");
        button.innerText = key;
        button.addEventListener("click", () => {
          handleClick(content, button.innerText);
        });
        content.append(button);
      }

      footer.id = "footer";
      footer.innerHTML = "<p>ⓒ 2025 Joni Mäkinen</p>";

      document.body.append(header);
      document.body.append(content);
      document.body.append(footer);
    }
  };
}

main();
