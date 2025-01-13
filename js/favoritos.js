document.addEventListener("DOMContentLoaded", () => {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const favoritosContainer = document.getElementById("favoritos");
  const modal = document.createElement("div");
  modal.className = "galeria-modal";
  document.body.appendChild(modal);

  // Verifica se existem favoritos e exibe ou não uma mensagem
  if (favoritos.length === 0) {
    favoritosContainer.innerHTML = "<p>Nenhum favorito encontrado.</p>";
  } else {
    favoritos.forEach((src) => {
      const div = document.createElement("div");
      div.className = "galeria-item";

      const img = document.createElement("img");
      img.src = src;
      img.alt = src;

      const removerBtn = document.createElement("button");
      removerBtn.textContent = "Remover";
      removerBtn.className = "remover-btn";

      // Evento para remover imagem dos favoritos
      removerBtn.addEventListener("click", () => {
        favoritos = favoritos.filter((imageSrc) => imageSrc !== src);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        favoritosContainer.removeChild(div); // Remove a imagem da tela
      });

      div.appendChild(img);
      div.appendChild(removerBtn);
      favoritosContainer.appendChild(div);

      // Evento para abrir a imagem no modal (igual ao comportamento da galeria)
      img.addEventListener("click", () => {
        modal.style.display = "flex";
        modal.innerHTML = `
          <div style="text-align: center; color: white;">
            <img src="${src}" alt="${src}" style="max-width: 80%; border-radius: 10px;">
            <p style="margin-top: 10px;">Imagem favorita</p>
            <button class="favoritar-modal-btn" id="favoritarModalBtn">
              ${favoritos.includes(src) ? "⭐ Favoritado" : "⭐ Favoritar"}
            </button>
          </div>
        `;

        // Botão de favoritar na modal (igual ao da galeria)
        const favoritarModalBtn = document.getElementById("favoritarModalBtn");
        favoritarModalBtn.addEventListener("click", () => {
          if (!favoritos.includes(src)) {
            favoritos.push(src);
            favoritarModalBtn.textContent = "⭐ Favoritado";
          } else {
            favoritos = favoritos.filter((imageSrc) => imageSrc !== src); // Remove da lista
            favoritarModalBtn.textContent = "⭐ Favoritar";
          }
          localStorage.setItem("favoritos", JSON.stringify(favoritos)); // Atualiza o localStorage
        });
      });
    });
  }

  // Fechar o modal quando clicar fora da imagem
  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
