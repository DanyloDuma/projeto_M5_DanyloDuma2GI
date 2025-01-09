document.addEventListener("DOMContentLoaded", () => {
  const galeria = document.getElementById("galeria");
  const modal = document.createElement("div");
  modal.className = "galeria-modal";
  document.body.appendChild(modal);

  fetch("js/imagens.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(image => {
        const div = document.createElement("div");
        div.className = "galeria-item";

        const img = document.createElement("img");
        img.src = image.src;
        img.alt = image.alt;

        div.appendChild(img);
        galeria.appendChild(div);

        div.addEventListener("click", () => {
          modal.style.display = "flex";
          modal.innerHTML = `
            <div style="text-align: center; color: white;">
              <img src="${image.src}" alt="${image.alt}" style="max-width: 80%; border-radius: 10px;">
              <p style="margin-top: 10px;">${image.alt}</p>
              <p><strong>Género:</strong> ${image.genero}</p>
            </div>`;
        });
      });
    });

  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });
});