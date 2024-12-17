class Resultados {
  constructor() {
      this.resultsDiv = document.getElementById('results'); // Onde os resultados serão exibidos
      this.getSearchTerm();
  }

  // Pega o termo de pesquisa da URL
  getSearchTerm() {
      const urlParams = new URLSearchParams(window.location.search);
      const searchTerm = urlParams.get('search');

      if (searchTerm) {
          this.displayResults(searchTerm);
      }
  }

  // Exibe os resultados
  displayResults(searchTerm) {
      let foundResults = [];
      const paragraphs = document.querySelectorAll('main p'); // Aqui, buscamos por parágrafos na página de resultados
      paragraphs.forEach(paragraph => {
          if (paragraph.textContent.toLowerCase().includes(searchTerm)) {
              foundResults.push(paragraph.textContent);
          }
      });

      // Exibe os resultados ou uma mensagem de "nenhum resultado encontrado"
      if (foundResults.length > 0) {
          foundResults.forEach(result => {
              let resultElement = document.createElement("div");
              resultElement.textContent = result;
              this.resultsDiv.appendChild(resultElement);
          });
      } else {
          this.resultsDiv.innerHTML = "<p><b>Nenhum resultado encontrado</b></p>";
      }
  }
}

// Inicializa a exibição dos resultados
document.addEventListener('DOMContentLoaded', () => {
  new Resultados();
});
