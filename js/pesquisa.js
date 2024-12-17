class Search {
  constructor() {
      this.searchInput = document.querySelector('.search-bar'); // Caixa de pesquisa
      this.searchButton = document.getElementById('searchButton'); // Botão de pesquisa
      this.setupEventListeners(); // Configura os ouvintes de eventos
  }

  setupEventListeners() {
      // Ao clicar no botão de pesquisa
      this.searchButton.addEventListener('click', () => this.performSearch());

      // Ao pressionar "Enter" na caixa de pesquisa
      this.searchInput.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
              this.performSearch();
          }
      });
  }

  // Realiza a pesquisa e redireciona para a página de resultados
  performSearch() {
      let searchTerm = this.searchInput.value.trim().toLowerCase(); // Termo de pesquisa

      if (searchTerm) {
          // Redireciona para a página de resultados com o termo de pesquisa
          window.location.href = `resultados.html?search=${encodeURIComponent(searchTerm)}`;
      }
  }
}

// Inicializa a funcionalidade de pesquisa
document.addEventListener('DOMContentLoaded', () => {
  new Search();
});
