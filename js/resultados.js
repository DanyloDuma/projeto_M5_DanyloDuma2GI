document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get("search");
  const resultsContainer = document.getElementById("results");

  if (!resultsContainer) {
    console.error("O container de resultados não foi encontrado.");
    return;
  }

  // Função para carregar imagens do localStorage e do JSON
  async function carregarImagens() {
    let imagens = JSON.parse(localStorage.getItem("imagens")) || [];

    // Verificar se o localStorage já contém imagens do JSON
    if (imagens.length === 0) {
      try {
        const response = await fetch("js/imagens.json");
        if (!response.ok) {
          throw new Error("Falha ao carregar o JSON de imagens.");
        }
        const jsonImagens = await response.json();
        imagens = [...jsonImagens];
        localStorage.setItem("imagens", JSON.stringify(imagens)); // Salvar no localStorage
      } catch (error) {
        console.error("Erro ao carregar imagens do JSON:", error);
      }
    }

    return imagens;
  }

  // Carregar imagens e realizar a pesquisa
  const galleryItems = await carregarImagens();

  if (searchTerm) {
    const searchTitle = document.createElement("h2");
    searchTitle.textContent = `Resultados para: ${searchTerm}`;
    resultsContainer.appendChild(searchTitle);

    // Filtrar resultados
    const filteredItems = galleryItems.filter(
      (item) =>
        item.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.genero.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Exibir os resultados filtrados
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

        // Adicionar evento de clique na div do resultado
        itemElement.addEventListener("click", () => openModal(item));
      });
    } else {
      const noResult = document.createElement("p");
      noResult.textContent = "Nenhum resultado encontrado.";
      resultsContainer.appendChild(noResult);
    }
  } else {
    const noTerm = document.createElement("p");
    noTerm.textContent = "Por favor, insira um termo de pesquisa.";
    resultsContainer.appendChild(noTerm);
  }

  // Função para abrir o modal
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");
  const closeButton = modal.querySelector(".close");

  function openModal(item) {
    modal.style.display = "flex";
    modalImage.src = item.src;
    modalImage.alt = item.alt;
    captionText.textContent = `${item.alt} (${item.genero})`;
  }

  // Fechar o modal ao clicar no botão "X"
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // Fechar o modal ao clicar fora da imagem
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
