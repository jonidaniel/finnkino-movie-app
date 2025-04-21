// Possible keywords to find with search input
let availableKeywords = [
  "Omena, Espoo",
  "Sello, Espoo",
  "Itis, Helsinki",
  "Kinopalatsi, Helsinki",
  "Maxim, Helsinki",
  "Tennispalatsi, Helsinki",
  "Flamingo, Vantaa",
  "Fantasia, Jyväskylä",
  "Scala, Kuopio",
  "Kuvapalatsi, Lahti",
  "Strand, Lappeenranta",
  "Plaza, Oulu",
  "Promenadi, Pori",
  "Cine Atlas, Tampere",
  "Plevna, Tampere",
  "Kinopalatsi, Turku",
  "Luxe Mylly, Raisio",
];

// Box, where suggested keywords are displayed
const resultsBox = document.querySelector(".result-box");
// Input field, where the search input is written
const inputBox = document.getElementById("input-box");

// Invoked when anything is written into the input field
inputBox.onkeyup = function () {
  // Will store all the filtered keywords according to the input
  let result = [];
  let input = inputBox.value;
  // If input has some value
  if (input.length) {
    // Checks if inputted text is similar to any of the available keywords
    // Everything is handled in lower case
    // result stores every keyword match in an array
    result = availableKeywords.filter((keyword) => {
      return keyword.toLowerCase().includes(input.toLowerCase());
    });
  }
  display(result);

  // Gets rid of the line below the input box
  if (!result.length) {
    resultsBox.innerHTML = "";
  }
};

// Displays the search results in result-box
function display(result) {
  const content = result.map((list) => {
    return "<li onclick=selectInput(this)>" + list + "</li>";
  });

  // .join("") displays the content array as a string
  // This way you get rid of unnecessary commas
  // that are generated when rendering arrays
  resultsBox.innerHTML = "<ul>" + content.join("") + "</ul>";
}

// Selects clicked item as the input box value
function selectInput(list) {
  inputBox.value = list.innerHTML;
  // Empties the results box
  resultsBox.innerHTML = "";
}
