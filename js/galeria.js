document.addEventListener("DOMContentLoaded", () => {
  const galeria = document.getElementById("galeria");
  const modalInserir = document.getElementById("modal-inserir");
  const btnInserirFoto = document.getElementById("btn-inserir-foto");
  const btnFecharModal = document.getElementById("btn-fechar-modal");
  const formInserir = document.getElementById("form-inserir");

  const modalDetalhes = document.createElement("div");
  modalDetalhes.className = "galeria-modal";
  document.body.appendChild(modalDetalhes);

  // Carregar os dados de favoritos e imagens do localStorage
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  let imagens = JSON.parse(localStorage.getItem("imagens")) || [];

  // Função para salvar imagens e favoritos no localStorage
  function salvarNoLocalStorage() {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    localStorage.setItem("imagens", JSON.stringify(imagens));
  }

  // Gerar expressão matemática simples para o reCAPTCHA
  function gerarCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operador = Math.random() > 0.5 ? "+" : "-";
    const resultado = operador === "+" ? num1 + num2 : num1 - num2;
    return { expressao: `${num1} ${operador} ${num2}`, resultado };
  }

  // Adicionar campo de CAPTCHA no modal de inserção
  const captchaContainer = document.createElement("div");
  captchaContainer.id = "captcha-container";
  captchaContainer.style.marginTop = "10px";
  formInserir.appendChild(captchaContainer);

  let captchaAtual = gerarCaptcha();
  captchaContainer.innerHTML = `
    <label for="captcha-resposta">Resolva: ${captchaAtual.expressao}</label>
    <input type="number" id="captcha-resposta" required />
    <p id="captcha-erro" style="color: red; display: none;">Resposta incorreta. Tente novamente.</p>
  `;




  // Atualizar CAPTCHA ao abrir o modal de inserção
  btnInserirFoto.addEventListener("click", () => {
    captchaAtual = gerarCaptcha();
    document.querySelector("#captcha-container label").textContent = `Resolva: ${captchaAtual.expressao}`;
    document.getElementById("captcha-resposta").value = "";
    document.getElementById("captcha-erro").style.display = "none";
    modalInserir.style.display = "flex";
  });

  // Fechar o modal de inserção
  btnFecharModal.addEventListener("click", () => {
    modalInserir.style.display = "none";
  });

  // Submeter nova imagem
  formInserir.addEventListener("submit", (e) => {
    e.preventDefault();
    const foto = document.getElementById("foto-upload").files[0];
    const titulo = document.getElementById("titulo-foto").value;
    const genero = document.getElementById("genero-foto").value;
    const captchaResposta = parseInt(document.getElementById("captcha-resposta").value, 10);

    if (captchaResposta !== captchaAtual.resultado) {
      document.getElementById("captcha-erro").style.display = "block";
      return;
    }
    
    if (foto && titulo && genero) {
      const reader = new FileReader();

      reader.onload = () => {
        const novaImagem = {
          src: reader.result, // URL em Base64
          alt: titulo,
          genero,
        };

        imagens.push(novaImagem); // Adicionar ao array
        salvarNoLocalStorage(); // Salvar no localStorage
        adicionarImagemNaGaleria(novaImagem); // Adicionar na galeria

        modalInserir.style.display = "none"; // Fechar modal
        formInserir.reset(); // Limpar formulário
      };

      reader.readAsDataURL(foto);
    }
  });

  // Carregar imagens iniciais do localStorage ou JSON
  if (imagens.length > 0) {
    imagens.forEach(adicionarImagemNaGaleria);
  } else {
    fetch("js/imagens.json")
      .then((response) => response.json())
      .then((data) => {
        imagens = data;
        salvarNoLocalStorage();
        data.forEach(adicionarImagemNaGaleria);
      });
  }

  // Função para adicionar imagens dinamicamente
  function adicionarImagemNaGaleria(imagem) {
    const div = document.createElement("div");
    div.className = "galeria-item";

    const img = document.createElement("img");
    img.src = imagem.src;
    img.alt = imagem.alt;

    const favoritarBtn = document.createElement("button");
    favoritarBtn.textContent = favoritos.includes(imagem.src)
      ? "⭐ Favoritado"
      : "⭐ Favoritar";
    favoritarBtn.className = "favoritar-btn";

    const removerBtn = document.createElement("button");
    removerBtn.textContent = "❌ Retirar";
    removerBtn.className = "remover-btn";

    // Favoritar ou desfavoritar
    favoritarBtn.addEventListener("click", () => {
      if (!favoritos.includes(imagem.src)) {
        favoritos.push(imagem.src);
        favoritarBtn.textContent = "⭐ Favoritado";
      } else {
        favoritos = favoritos.filter((src) => src !== imagem.src);
        favoritarBtn.textContent = "⭐ Favoritar";
      }
      salvarNoLocalStorage(); // Atualizar localStorage
    });

    // Remover imagem
    removerBtn.addEventListener("click", () => {
      imagens = imagens.filter((img) => img.src !== imagem.src);
      favoritos = favoritos.filter((src) => src !== imagem.src); // Garantir que favoritos sejam removidos também
      salvarNoLocalStorage(); // Atualizar localStorage
      div.remove(); // Remover do DOM
    });

    div.appendChild(img);
    div.appendChild(favoritarBtn);
    div.appendChild(removerBtn);
    galeria.appendChild(div);

    // Evento para exibir modal de detalhes
    div.addEventListener("click", (event) => {
      if (event.target.tagName !== "BUTTON") {
        modalDetalhes.style.display = "flex";
        modalDetalhes.innerHTML = `
          <div style="text-align: center; color: white;">
            <img src="${imagem.src}" alt="${imagem.alt}" style="max-width: 80%; border-radius: 10px;">
            <p style="margin-top: 10px;">${imagem.alt}</p>
            <p><strong>Género:</strong> ${imagem.genero}</p>
            <button class="favoritar-modal-btn" id="favoritarModalBtn">
              ${favoritos.includes(imagem.src) ? "⭐ Favoritado" : "⭐ Favoritar"}
            </button>
            <button class="remover-modal-btn" id="removerModalBtn">❌ Apagar Foto</button>
          </div>`;

        const favoritarModalBtn = document.getElementById("favoritarModalBtn");
        const removerModalBtn = document.getElementById("removerModalBtn");

        // Alterar favoritar no modal
        favoritarModalBtn.addEventListener("click", () => {
          if (!favoritos.includes(imagem.src)) {
            favoritos.push(imagem.src);
            favoritarModalBtn.textContent = "⭐ Favoritado";
          } else {
            favoritos = favoritos.filter((src) => src !== imagem.src);
            favoritarModalBtn.textContent = "⭐ Favoritar";
          }
          salvarNoLocalStorage(); // Atualizar localStorage
        });

        // Remover imagem do modal
        removerModalBtn.addEventListener("click", () => {
          imagens = imagens.filter((img) => img.src !== imagem.src);
          favoritos = favoritos.filter((src) => src !== imagem.src); // Remover dos favoritos
          salvarNoLocalStorage(); // Atualizar localStorage
          modalDetalhes.style.display = "none"; // Fechar o modal
          div.remove(); // Remover do DOM
        });
      }
    });
  }

  // Fechar modal de detalhes ao clicar fora
  modalDetalhes.addEventListener("click", () => {
    modalDetalhes.style.display = "none";
  });
});
