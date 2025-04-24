// SEARCH INPUT AUTOCOMPLETE

// Possible keywords to find by searching
const availableKeywords = [
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

// The box where suggested keywords are displayed
const resultsBox = document.querySelector(".result-box");
// The input field where search input is written
const inputBox = document.getElementById("input-box");

/* Sets clicked item as the input box value
 *
 * Also empties the results box
 *
 * Params:
 * item, object (element) – contains the list item that was clicked
 */
function selectInput(item) {
  // When any list item is clicked, it's set as the input box value
  inputBox.value = item.innerHTML;
  // Empties the results box
  resultsBox.innerHTML = "";
}

/* Displays the search results in resultsBox
 *
 * Inserts the array elements into an unordered list as a string
 *
 * Params:
 * result, object (array) – contains all keyword matches
 */
function display(result) {
  // Executes a function to all result array elements,
  // then returns every modified element to content
  // All list items are assigned a listener
  const content = result.map((item) => {
    return "<li onclick=selectInput(this)>" + item + "</li>";
  });

  // The join function joins the content array elements into a string
  // This way you get rid of unnecessary commas that are generated when rendering arrays
  resultsBox.innerHTML = "<ul>" + content.join("") + "</ul>";
}

/* Looks for search input matches from availableKeywords
 * Is invoked when anything is written (when key is released, to be accurate) into the input field
 *
 * Passes keyword matches to display function
 * Also gets rid of the line below the search input field, when necessary
 * (i.e. when there are no keyword matches)
 */
inputBox.onkeyup = function () {
  // Will store all the filtered keywords according to the input
  let result = [];
  let input = inputBox.value;
  // If input has some value
  if (input.length) {
    // Checks if inputted text is similar to any of the available keywords
    // Everything is handled in lower case
    // If returns true, element is added to result
    result = availableKeywords.filter((keyword) => {
      return keyword.toLowerCase().includes(input.toLowerCase());
    });
  }
  // Keyword matches are passed to display
  display(result);

  // Gets rid of the line below the input box
  if (!result.length) {
    resultsBox.innerHTML = "";
  }
};
