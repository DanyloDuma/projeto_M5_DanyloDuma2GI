class Search {
  constructor(
    searchInputSelector = ".search-bar",
    searchButtonSelector = "#searchButton"
  ) {
    this.searchInput = document.querySelector(searchInputSelector); // Caixa de pesquisa
    this.searchButton = document.querySelector(searchButtonSelector); // Botão de pesquisa

    if (this.searchInput && this.searchButton) {
      this.setupEventListeners();
    } else {
      console.error("Elementos de busca não encontrados.");
    }
  }

  setupEventListeners() {
    // Evento ao clicar no botão de pesquisa
    this.searchButton.addEventListener("click", () => this.performSearch());

    // Evento ao pressionar Enter no campo de busca
    this.searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.performSearch();
      }
    });
  }

  performSearch() {
    const searchTerm = this.searchInput.value.trim(); // Captura o termo de busca

    if (searchTerm) {
      // Redireciona para resultados.html com o termo na URL
      window.location.href = `resultados.html?search=${encodeURIComponent(
        searchTerm
      )}`;
    } else {
      alert("Por favor, insira um termo para pesquisa.");
    }
  }
}

// Inicializa a funcionalidade de busca
document.addEventListener("DOMContentLoaded", () => {
  new Search();
});
