document.addEventListener("DOMContentLoaded", () => {
  const galeria = document.getElementById("galeria");
  const modal = document.createElement("div");
  modal.className = "galeria-modal";
  document.body.appendChild(modal);

  // Carregar favoritos do localStorage
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  fetch("js/imagens.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((image) => {
        const div = document.createElement("div");
        div.className = "galeria-item";

        const img = document.createElement("img");
        img.src = image.src;
        img.alt = image.alt;

        const favoritarBtn = document.createElement("button");
        favoritarBtn.textContent = favoritos.includes(image.src)
          ? "⭐ Favoritado"
          : "⭐ Favoritar";
        favoritarBtn.className = "favoritar-btn";

        // Evento para favoritar ou desfavoritar na galeria
        favoritarBtn.addEventListener("click", () => {
          if (!favoritos.includes(image.src)) {
            favoritos.push(image.src);
            favoritarBtn.textContent = "⭐ Favoritado";
          } else {
            favoritos = favoritos.filter((src) => src !== image.src); // Remove da lista
            favoritarBtn.textContent = "⭐ Favoritar";
          }
          localStorage.setItem("favoritos", JSON.stringify(favoritos)); // Atualiza o localStorage
        });

        div.appendChild(img);
        div.appendChild(favoritarBtn);
        galeria.appendChild(div);

        div.addEventListener("click", (event) => {
          if (event.target.tagName !== "BUTTON") {
            modal.style.display = "flex";
            modal.innerHTML = `<div style="text-align: center; color: white;">
                <img src="${image.src}" alt="${
              image.alt
            }" style="max-width: 80%; border-radius: 10px;">
                <p style="margin-top: 10px;">${image.alt}</p>
                <p><strong>Género:</strong> ${image.genero}</p>
                <button class="favoritar-modal-btn" id="favoritarModalBtn">
                  ${
                    favoritos.includes(image.src)
                      ? "⭐ Favoritado"
                      : "⭐ Favoritar"
                  }
                </button>
              </div>`;

            // Botão de favoritar na modal
            const favoritarModalBtn =
              document.getElementById("favoritarModalBtn");
            favoritarModalBtn.addEventListener("click", () => {
              if (!favoritos.includes(image.src)) {
                favoritos.push(image.src);
                favoritarModalBtn.textContent = "⭐ Favoritado";
              } else {
                favoritos = favoritos.filter((src) => src !== image.src); // Remove da lista
                favoritarModalBtn.textContent = "⭐ Favoritar";
              }
              localStorage.setItem("favoritos", JSON.stringify(favoritos)); // Atualiza o localStorage
            });
          }
        });
      });
    });

  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
