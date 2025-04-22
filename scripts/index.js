function main() {
  const header = document.createElement("div");
  const searchBox = document.createElement("div");
  const content = document.createElement("div");
  content.id = "content";
  const footer = document.createElement("div");

  /** Webpage layout
   * 1. header
   * 2. search box
   * 3. movie results from search
   * 4. footer
   */
  header.innerHTML = `<h1 id="header">Finnkino Elokuvat</h1>`;
  searchBox.innerHTML = `
    <div class="search-box">
      <div class="row">
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

  document.body.append(header);
  document.body.append(searchBox);
  document.body.append(content);
  document.body.append(footer);
}

main();
