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

const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");

inputBox.onkeyup = function () {
  let result = [];
  let input = inputBox.value;
  if (input.length) {
    result = availableKeywords.filter((keyword) => {
      return keyword.toLowerCase().includes(input.toLowerCase());
    });
  }
  display(result);

  if (!result.length) {
    resultsBox.innerHTML = "";
  }
};

function display(result) {
  const content = result.map((list) => {
    return "<li onclick=selectInput(this)>" + list + "</li>";
  });

  resultsBox.innerHTML = "<ul>" + content.join("") + "</ul>";
}

function selectInput(list) {
  inputBox.value = list.innerHTML;
  resultsBox.innerHTML = "";
}
