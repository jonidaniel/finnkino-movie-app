/* Constructs webpage main components:
header, search box, content container containing show results, and footer

Webpage layout from top to bottom
1. header
2. search box
3. show results, dependent on search
4. footer */
function main() {
  const header = document.createElement("div");
  const searchBox = document.createElement("div");
  const content = document.createElement("div");
  content.id = "content";
  const footer = document.createElement("div");

  header.innerHTML = `<h1 id="header">Movioso</h1>`;
  searchBox.innerHTML = `
    <div class="search-box">
      <div class="search-row">
        <input
          type="text"
          id="input-box"
          placeholder="Etsi elokuvateatteria..."
          autocomplete="off"
        />
        <button onclick="handleClick(document.getElementById('input-box').value)">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div class="result-box"></div>
    </div>
  `;
  footer.innerHTML = `<h4 id="footer">ⓒ 2025 Joni Mäkinen</h4>`;

  // Append all main component to webpage
  document.body.append(header);
  document.body.append(searchBox);
  document.body.append(content);
  document.body.append(footer);
}

main();
