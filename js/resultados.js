document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get("search");
  const resultsContainer = document.getElementById("results");

  if (!resultsContainer) {
    console.error("O container de resultados não foi encontrado.");
    return;
  }

  // Carregar dados do JSON
  try {
    const response = await fetch("js/imagens.json");
    const galleryItems = await response.json();

    if (searchTerm) {
      const searchTitle = document.createElement("h2");
      searchTitle.textContent = `Resultados para: "${searchTerm}"`;
      resultsContainer.appendChild(searchTitle);

      // Filtrar resultados
      const filteredItems = galleryItems.filter(
        (item) =>
          item.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.genero.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filteredItems.length > 0) {
        filteredItems.forEach((item) => {
          const itemElement = document.createElement("div");
          itemElement.classList.add("result-item");

          // Exibir a imagem e informações
          itemElement.innerHTML = `
                        <img src="${item.src}" alt="${item.alt}" class="result-img">
                        <p>${item.alt} (${item.genero})</p>
                    `;
          resultsContainer.appendChild(itemElement);
        });
      } else {
        resultsContainer.textContent = "Nenhum resultado encontrado.";
      }
    } else {
      resultsContainer.textContent = "Por favor, insira um termo de pesquisa.";
    }
  } catch (error) {
    resultsContainer.textContent = "Erro ao carregar os dados.";
    console.error("Erro ao carregar o JSON de imagens:", error);
  }
});
